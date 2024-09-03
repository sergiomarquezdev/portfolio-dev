export interface CV {
    basics: Basics;
    work: Array<Work>;
    education: Array<Education>;
    certificates: Array<Certificates>;
    skills: Array<Skills>;
    projects: Array<Projects>;
}

interface Basics {
    name: string;
    label: string;
    image: string;
    email: string;
    url: string;
    summary: string;
    location: Location;
    profiles: Array<Profiles>;
}

interface Location {
    city: string;
    region: string;
}

interface Profiles {
    network: string;
    username: string;
    url: string;
}

interface Work {
    company: string;
    position: string;
    website: string;
    startDate: DateStr;
    endDate: DateStr | null;
    summary: string;
    highlights: Highlight;
}

type DateStr = `${string}-${string}-${string}`;

interface Skills {
    name: string;
    icon: string;
}

interface Certificates {
    name: string;
    date: DateStr;
    issuer: string;
    url: string;
}

interface Education {
    institution: string;
    url: string;
    area: string;
    studyType: string;
    startDate: DateStr;
    endDate: DateStr;
    score: string;
    courses: Array<string>;
}

interface Projects {
    name: string;
    isActive: boolean;
    description: string;
    highlights: Highlight;
    url: string;
    github?: string;
}

type Highlight = Array<String>;
