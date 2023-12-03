import { BreakerOptions } from "./options";
import { BreakerState } from "./states";
import { AxiosRequestConfig } from "axios";

const axios = require("axios");

export class CircuitBreaker {
    private request: AxiosRequestConfig;
    private state: BreakerState;

    private failureCount: number;
    private successCount: number;

    private nextAttempt: number;

    // Options
    private failureThreshold: number;
    private successThreshold: number;
    private timeout: number;


    constructor(request: AxiosRequestConfig, options?: BreakerOptions) {

        this.request        = request;
        this.state          = BreakerState.GREEN;

        this.failureCount   = 0;
        this.successCount   = 0;
        this.nextAttempt    = Date.now();
        this.failureThreshold   = options?.failureThreshold || 5;
        this.successThreshold   = options?.successThreshold || 2;
        this.timeout            = options?.timeout || 3000;
    }

    private log(data: any): void {
        console.log({
            data: data,
            Successes: this.successCount,
            Failures: this.failureCount,
            State: this.state
        });
    }

    private success(res: any): any {
        this.failureCount = 0;
        if ( this.state === BreakerState.YELLOW ) {
            this.successCount++;

            if ( this.successCount > this.successThreshold ) {
                this.successCount = 0;
                this.state = BreakerState.GREEN;
            }
        }
        this.log( "Success" );
        return res;
    }

    private failure(res: any): any {
        this.failureCount++;
        if ( this.failureCount >= this.failureThreshold ) {
            this.state = BreakerState.RED;

            this.nextAttempt = Date.now() + this.timeout;
        }
        this.log( "Failure" );
        return res;
    }

    public async exec(): Promise<void> {
        if ( this.state === BreakerState.RED ) {
            if ( this.nextAttempt <= Date.now() ) {
                this.state = BreakerState.YELLOW;
            } else {
                throw new Error( "Circuit not opened yet. Try after sometime.." );
            }
        }

        try {
            const response = await axios( this.request );
            if ( response.status === 200 ) {
                return this.success( response.data );
            } else {
                return this.failure( response.data );
            }
        } catch ( err ) {
            return this.failure( err.message );
        }
    }
}
