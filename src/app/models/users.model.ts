export class User {
    constructor(
        public id?: string,
        public firstname?: string,
        public lastname?: string,
        public username?: string,
        public email?: string,
        public password?: string,
        public avatar_url?: string,
        public company?: string,
        public job?: string,
        public links?: [
            {
                github: string,
                linkedin: string,
                blog: string,
                website: string
            }
        ],
        public phone?: number,
        public _id?: string,
        public projects?: [
            {
                id: string,
                accepted: boolean,
                invitedBy: string,
                favorite: boolean,
                project_id:string,
                _id: string
            }
        ],
        public tasks?: [
            {
                id: string
            }
        ]
    ) { }
}