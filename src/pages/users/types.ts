export type AddAgencyPayload = {
    name?: string;
    username?: string;
    password?: string;
    countryId?: string;
    languageId?: string;
    uniqueId?: string;
    image?: any;
}

export type EditAgencyPayload = {
    name?: string;
    username?: string;
    password?: string;
    countryId?: string;
    languageId?: string;
    uniqueId?: string;
    image?: any;
}

export type AllAgencyItem = {
    name: string;
    password: string;
    username: string;
    image?: Image;
    _id: string;
    slug: string;
    languageDetails?: {
        name: string;
        _id: string;
    },
    countryDetails?: {
        name: string;
        _id: string;
    }
}


export type Image = {
    asset_id?: string;
    secure_url?: string;
    url?: string;
    public_id?: string;
};