import { defineField, defineType } from "sanity";

export const globalOptions = defineType({
    name: 'globalOptions',
    title: 'Global Options',
    type: 'document',
    // Singleton pattern: Use documentActions to restrict creation
    // Note: To enforce singleton, manually create one document with _id = "globalOptions"
    // Then the create/delete actions can be hidden via documentActions in sanity.config.ts
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string'
        }),
        defineField({
            name: 'contactMobile',
            title: 'Contact Mobile No',
            type: 'string'
        }),
        defineField({
            name: 'companyAddress',
            title: 'Company Address',
            type: 'blockContent',
        }),
        defineField({
            name: 'instagramUrl',
            title: 'Instagram URL',
            type: 'url',
        }),
        defineField({
            name: 'linkedinUrl',
            title: 'Linkedin URL',
            type: 'url',
        }),
    ],
    // Validation to prevent creating multiple documents
    // This ensures only one globalOptions document can exist
    validation: (Rule) => Rule.custom(async (value, context) => {
        const { getClient } = context;
        const client = getClient({ apiVersion: '2024-01-01' });
        const { document } = context;
        
        // Only validate on create, not on update
        if (document && document._createdAt) {
            // Document exists, this is an update - allow it
            return true;
        }
        
        // Check if any globalOptions document already exists
        const existingDocs = await client.fetch('*[_type == "globalOptions" && !(_id in path("drafts.**"))]');
        
        if (existingDocs && existingDocs.length > 0) {
            return 'Only one Global Options document can exist. Please edit the existing document instead.';
        }
        
        return true;
    }),
})