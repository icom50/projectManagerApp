export class Project {
    constructor (
        public name? : string,
        public description? : string,
        public author_id? : string,
        public creation_date? : string,
        public start_date? : string,
        public finish_date? : string,
        public deadline? : string,
        public status? : string,
        public _id? : string,
        public users? : [
            {
                user_id? : string,
                job? : string,
                role? : string,
                _id? : string
            }
        ],
        public is_private? : boolean,
        public attachements? : [
            {
                path? : string,
                name? : string,
                description? : string,
                _id? : string
            }
        ],
        public comments? : [
            {
                author_id? : string,
                comment? : string,
                date? : number,
                _id? : string,
            }
        ],
        public git? : string,
        public ressources? : [
            {
                name? : string,
                description? : string,
                url? : string,
                author? : string,
                date? : number,
                _id? : string,
            },
        ],
        public tasks? : [
            {
                name? : string,
                description? : string,
                author_id? : string,
                labels? : [
                    {
                        name? : string,
                        color? : string,
                        _id? : string
                    },
                ],            
                assigned? : [
                    {
                        user_id? : string,
                        spend? : number,
                        _id? : string
                    },
                ],
                checklist? : [
                    {
                        name? : string,
                        done? : boolean,
                        _id? : string
                    },
                ],
                deadline? : string,
                progression? : number,
                estimated? : number,
                priority? : string,
                attachments? : [
                    {
                        name? : string,
                        description? : string,
                        path? : string,
                        author_id? : string,
                        date? : number,
                        _id? : string
                    }
                ],  
                comments? : [
                    {
                        author_id? : string,
                        comment? : string,
                        date? : number,
                        _id? : string
                    }
                ],
                status? : string
            }
        ]
        
    ) {}

}