export class User {
    constructor (
        public id? : string,
        public firstname? : string,
        public lastname? : string,
        public username? : string,
        public email? : string,
        public password? : string,
        public avatar_url? : string,
        public company? : string,
        public job? : string,
        public links? : string[],
        public phone? : number,
        public _id? : string,
        public projects? : [
            {
                id? : string,
                accepted? : boolean,
                invitedBy : string,
                favorite : boolean,
                _id? : string
            }    
        ],
        public tasks? : string[]
    ) {}
}