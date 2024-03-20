import HomePage from "dh-marvel/pages/index.page";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { render, screen, waitFor } from "@testing-library/react";
import { Comics } from "interface/comics"; 

const mockComics: Comics = {
    code: "200",
    status: "Ok",
    copyright: "Copyright",
    attributionText: "Attribution Text",
    attributionHTML: "<a href=\"#\">Attribution HTML</a>",
    etag: "ETag",
    data: {
        offset: 0,
        limit: 12,
        total: 24,
        count: 12,
        results: Array(12).fill({
            id: 1,
            title: "Comic Title",
            thumbnail: { path: "path", extension: "jpg" }
        })
    }
};
const dataComicsCard= [
    {
        id: 1158,
        image: "http://i.annihil.us/u/prod/marvel/i/mg/2/f0/4bc6670c80007.jpg",
        title: "ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB (Trade Paperback)",
    },
    {
        id: 17486,
        title: "X-Men: Phoenix - Warsong (2006)",
        image: "http://i.annihil.us/u/prod/marvel/i/mg/6/50/4c3645d0d29e3.jpg",        
    },
]

jest.mock("dh-marvel/services/marvel/marvel.service", () => ({
    getComics: jest.fn()
}));

describe("HomePage", () => {

    beforeEach(() => {
        (getComics as jest.Mock).mockResolvedValue(mockComics);
    });

    jest.setTimeout(10000); 

    test("should render comics grid and pagination", async () => {

        render(<HomePage marvelCards={dataComicsCard} comics={mockComics} />);
        await waitFor(() => {
            const paginationElement = screen.getByTestId("pagination-component");
            expect(paginationElement).toBeInTheDocument();
        },); 
        const comicElements = screen.getAllByTestId("comic-image");
        expect(comicElements).toHaveLength(dataComicsCard.length);
    });

    test("should render comics with correct titles", async () => {

        render(<HomePage marvelCards={dataComicsCard} comics={mockComics} />);
        
        await waitFor(() => {
            const comicTitleElement1 = screen.getByText("ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB (Trade Paperback)");
            const comicTitleElement2 = screen.getByText("X-Men: Phoenix - Warsong (2006)");
            expect(comicTitleElement1).toBeInTheDocument();
            expect(comicTitleElement2).toBeInTheDocument();
        }); 
    },);

});
