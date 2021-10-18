export interface Headers {
    url: string;
    title: string;
    logo: { url: string; filename: string }
    notification_bar: {
        show_announcement: boolean;
        announcement_text: string;
    };
    navigation_menu: {
        label: string;
        page_reference: {
            title: string;
            url: string;
        };
        notification_bar: {
            show_announcement: boolean;
            announcement_text: string;
        }
    }[]
}