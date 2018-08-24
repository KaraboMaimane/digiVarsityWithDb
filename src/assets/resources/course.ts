export class Course{
    url: string;
    name: string;
    description: string;
    pricing: number;
    rating: number;

    constructor(url:string ,name: string, description: string, pricing: number){
        this.url = url;
        this.name = name;
        this.description = description;
        this.pricing = pricing;
    }
}

let courseArray = [];

let course = new Course("../../assets/imgs/stefan-stefancik-257625-unsplash.jpg" ,"BSc Computer Sciences", "Computer Science is the study of computers and computational systems", 2000);
courseArray.push(course);

export default courseArray;