export class Project {
    constructor(
        public description?: string,
        public status?: string,
        public is_private?: true,
        public git?: string,
        public color?: string,
        public _id?: string,
        public name?: string,
        public author_id?: string,
        public users?: [
            {
                role: string,
                avatar_url: string,
                _id: string,
                email: string,
                user_id: string,
                job: string
            }
        ],
        public comments?: [
            {
                comment: string,
                date: string,
                _id: string,
                author_id: string
            }
        ],
        public tasks?: [
            {
                total_time: number,
                progression: number,
                estimated: number,
                priority: string,
                status: string,
                labels: string[],
                assigned: string[],
                checklist: string[],
                deadline: string,
                attachments: string[],
                comments: string[],
                _id: string,
                name: string,
                description: string,
                author_id: string
            }
        ],
        public creation_date?: string,
        public start_date?: string,
        public finish_date?: string,
        public deadline?: string,
        public attachments?: string[],
        public ressources?: string[]
    ) { }

}