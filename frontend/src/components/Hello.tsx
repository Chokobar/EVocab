import * as React from "react";

interface HelloProps { greeting: string; }

export const Hello = (props: HelloProps) => { return( <h1 className='text-primary'>Hello from {props.greeting}!</h1> )};