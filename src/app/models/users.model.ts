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
                acepted? : boolean,
                invitedBy : string,
                favorite : boolean,
                _id? : string
            }    
        ],
        public tasks? : string[]
    ) {}
}

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);