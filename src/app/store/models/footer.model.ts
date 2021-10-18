export interface Footer {
    title: string;
    navigation: {
        link: {
            href: string;
            title: string;
        }[];
    };
    social: {
        social_share: {
            link: {
                title: string;
                href: string;
            }
            icon: {
                url: string;
                filename: string;
            }
        }[];
    };
    logo: {
        url: string;
        file_size: string;
    };
    copyright: string;
}