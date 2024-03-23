import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import ComicPage from "./[id].page";
import { error } from "console";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("dh-marvel/services/marvel/marvel.service", () => ({
    getComic: jest.fn(),
}));

describe("ComicPage", () => {

    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({
        isFallback: false,
    });

    test("renders comic details when comic is found", async () => {
        const mockComic = {
            id: 1,
            digitalId: 1234,
            title: "Mock Comic Title",
            issueNumber: "1",
            variantDescription: "Variant Description",
            description: "Mock Comic Description",
            modified: "2024-03-18T10:15:30Z",
            isbn: "1234567890",
            upc: "123456",
            diamondCode: "123",
            ean: "12345678",
            issn: "123456",
            format: "Comic Format",
            pageCount: 50,
            textObjects: [
                {
                    type: "Type 1",
                    language: "Language 1",
                    text: "Text 1"
                },
                {
                    type: "Type 2",
                    language: "Language 2",
                    text: "Text 2"
                }
            ],
            resourceURI: "http://example.com/comic/1",
            urls: [
                {
                    type: "detail",
                    url: "http://example.com/comic/1/detail"
                },
                {
                    type: "purchase",
                    url: "http://example.com/comic/1/purchase"
                }
            ],
            series: {
                resourceURI: "http://example.com/series/1",
                name: "Mock Series"
            },
            variants: [
                {
                    resourceURI: "http://example.com/comic/2",
                    name: "Variant 1"
                },
                {
                    resourceURI: "http://example.com/comic/3",
                    name: "Variant 2"
                }
            ],
            collections: [
                {
                    resourceURI: "http://example.com/collection/1",
                    name: "Collection 1"
                },
                {
                    resourceURI: "http://example.com/collection/2",
                    name: "Collection 2"
                }
            ],
            collectedIssues: [
                {
                    resourceURI: "http://example.com/comic/4",
                    name: "Collected Issue 1"
                },
                {
                    resourceURI: "http://example.com/comic/5",
                    name: "Collected Issue 2"
                }
            ],
            dates: [
                {
                    type: "onsaleDate",
                    date: "2024-03-18T00:00:00Z"
                },
                {
                    type: "focDate",
                    date: "2024-02-25T00:00:00Z"
                }
            ],
            prices: [
                {
                    type: "printPrice",
                    price: "2.99"
                },
                {
                    type: "digitalPurchasePrice",
                    price: "1.99"
                }
            ],
            thumbnail: {
                path: "http://example.com/thumbnail/1",
                extension: "jpg"
            },
            images: [
                {
                    path: "http://example.com/image/1",
                    extension: "jpg"
                },
                {
                    path: "http://example.com/image/2",
                    extension: "jpg"
                }
            ],
            creators: {
                available: "2",
                returned: "2",
                collectionURI: "http://example.com/comic/1/creators",
                items: [
                    {
                        resourceURI: "http://example.com/creator/1",
                        name: "Creator 1",
                        role: "Writer"
                    },
                    {
                        resourceURI: "http://example.com/creator/2",
                        name: "Creator 2",
                        role: "Artist"
                    }
                ]
            },
            characters: {
                available: "2",
                returned: "2",
                collectionURI: "http://example.com/comic/1/characters",
                items: [
                    {
                        resourceURI: "http://example.com/character/1",
                        name: "Character 1",
                        role: "Main"
                    },
                    {
                        resourceURI: "http://example.com/character/2",
                        name: "Character 2",
                        role: "Supporting"
                    }
                ]
            },
            stories: {
                available: "4",
                returned: "4",
                collectionURI: "http://example.com/comic/1/stories",
                items: [
                    {
                        resourceURI: "http://example.com/story/1",
                        name: "Story 1",
                        type: "cover"
                    },
                    {
                        resourceURI: "http://example.com/story/2",
                        name: "Story 2",
                        type: "interior story"
                    }
                ]
            },
            events: {
                available: "2",
                returned: "2",
                collectionURI: "http://example.com/comic/1/events",
                items: [
                    {
                        resourceURI: "http://example.com/event/1",
                        name: "Event 1"
                    },
                    {
                        resourceURI: "http://example.com/event/2",
                        name: "Event 2"
                    }
                ]
            },
            price: 10, // Precio del comic
            oldPrice: 15, // Precio anterior del comic
            stock: 20 // Stock disponible del comic
        };

        (getComic as jest.Mock).mockResolvedValue(mockComic);

        render(<ComicPage comic={mockComic} error="" />);
        
        expect(screen.getByText("Mock Comic Title")).toBeInTheDocument();
        expect(screen.getByText("Mock Comic Description")).toBeInTheDocument();
    });

        test("renders error message when comic is not found", async () => {
            const mockEmptyComic= {
                id: 0,
                digitalId: 0,
                title: "",
                issueNumber: "",
                variantDescription: "",
                description: "",
                modified: "",
                isbn: "",
                upc: "",
                diamondCode: "",
                ean: "",
                issn: "",
                format: "",
                pageCount: 0,
                textObjects: [],
                resourceURI: "",
                urls: [],
                series: {
                    resourceURI: "",
                    name: ""
                },
                variants: [],
                collections: [],
                collectedIssues: [],
                dates: [],
                prices: [],
                thumbnail: {
                    path: "",
                    extension: ""
                },
                images: [],
                creators: {
                    available: "",
                    returned: "",
                    collectionURI: "",
                    items: []
                },
                characters: {
                    available: "",
                    returned: "",
                    collectionURI: "",
                    items: []
                },
                stories: {
                    available: "",
                    returned: "",
                    collectionURI: "",
                    items: []
                },
                events: {
                    available: "",
                    returned: "",
                    collectionURI: "",
                    items: []
                },
                price: 0,
                oldPrice: 0, 
                stock:  0
            };
            (getComic as jest.Mock).mockResolvedValue("Comic not found");
    
            render(<ComicPage comic={mockEmptyComic} error=""/>);
            
            expect(screen.getByText("Sin descripción disponible")).toBeInTheDocument();
            expect(screen.getByText("Sin personajes")).toBeInTheDocument();
        });
});
