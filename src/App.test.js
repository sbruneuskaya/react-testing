import {render, screen, fireEvent,act} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";
import axios from "axios";
import React from "react";

// test('renders learn react link', () => {
//     const {asFragment} = render(<App/>);
//     expect(asFragment(<App/>)).toMatchSnapshot()
//     // const linkElement = screen.getByText(/learjn react/i);
//     // expect(linkElement).toBeInTheDocument();
//     // screen.debug()
// });

// describe("App", () => {
//     // it("Render App Component", () => {
//     //     render(<App/>);
//     //     screen.debug();
//     //     expect(screen.getByText("Search:")).toBeInTheDocument();
//     //     expect(screen.getByRole("textbox")).toBeInTheDocument();
//     //     expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
//     //     expect(screen.getByPlaceholderText("input placeholder...")).toBeInTheDocument();
//     //     expect(screen.getByAltText("logo")).toBeInTheDocument();
//     //     expect(screen.getByDisplayValue("")).toBeInTheDocument();
//     // })
//
//     // it("Render App Test", () => {
//     //     render(<App/>);
//     //     // screen.debug();
//     //     //утверждаем, что элемента нет в разметке
//     //     expect(screen.queryByText(/Search for react/i)).toBeNull();
//     // })
//
//     // it("Render App Async Test", async () => {
//     //     render(<App/>);
//     //     //утверждаем, что элемента нет в разметке
//     //     expect(screen.queryByText(/HELLO IT/i)).toBeNull();
//     //     screen.debug()
//     //     expect(await screen.findByText(/HELLO IT/i)).toBeInTheDocument();
//     //     screen.debug()
//     //
//     //     expect(screen.getByAltText("logo")).toHaveClass("logoWrapper")
//     //     expect(screen.getByLabelText(/search/i)).not.toBeRequired()
//     //     expect(screen.getByLabelText(/search/i)).toBeEmpty()
//     //     expect(screen.getByLabelText(/search/i)).toHaveAttribute("id")
//     //
//     //         // .toBeRequired()  проверит обязательно ли поле для заполнения
//     // })
//
//     // it("Render App Component", async () => {
//     //     render(<App/>);
//     //     await screen.findByText(/HELLO IT/i)
//     //
//     //
//     //     expect(screen.queryByText("Searches for React")).toBeNull()
//     //     screen.debug()
//     //     fireEvent.change(screen.getByRole("textbox"), {
//     //         target: {value: "React"}
//     //     })
//     //     expect(screen.queryByText(/Searches for React/)).toBeInTheDocument();
//     //     screen.debug()
//     //
//     // })
//
//     it("Render with User Event", async () => {
//         render(<App/>);
//         await screen.findByText(/HELLO IT/i)
//         expect(screen.queryByText("Searches for React")).toBeNull()
//         screen.debug()
//         userEvent.type(screen.getByRole("textbox"), "React")
//         expect(screen.queryByText(/Searches for React/)).toBeInTheDocument();
//         screen.debug()
//
//     })
// })

// describe("checkbox event", () => {
//     it("checkbox click", () => {
//         const handleChange = jest.fn()
//         const {container} = render(<input type={"checkbox"} onChange={handleChange}/>)
//         const checkbox = container.firstChild
//         expect(checkbox).not.toBeChecked()
//         fireEvent.click(checkbox)
//         expect(checkbox).toBeChecked()
//     })
//
//     it("input focus", () => {
//         const {getByTestId} = render(<input type={"text"} data-testid={"simple-input"}/>)
//         const input = getByTestId("simple-input")
//         expect(input).not.toHaveFocus()
//         input.focus()
//         expect(input).toHaveFocus()
//     })
// })

// describe("checkbox event", () => {
//     it("checkbox click", () => {
//         const handleChange = jest.fn()
//         const {container} = render(<input type={"checkbox"} onChange={handleChange}/>)
//         const checkbox = container.firstChild
//         expect(checkbox).not.toBeChecked()
//         userEvent.click(checkbox)
//         expect(checkbox).toBeChecked()
//     })
//
//
//     it("double click", () => {
//         const onChange = jest.fn()
//         const {container} = render(<input type={"checkbox"} onChange={onChange}/>)
//         const checkbox = container.firstChild
//         expect(checkbox).not.toBeChecked()
//         userEvent.dblClick(checkbox)
//         expect(checkbox).toHaveBeenCalledTimes(2)
//     })
//
//     it("focus", () => {
//         const {getAllByTestId} = render(
//             <div>
//                 <input type="checkbox" data-testid={"element"}/>
//                 <input type="radio" data-testid={"element"}/>
//                 <input type="number" data-testid={"element"}/>
//             </div>
//         )
//         const [checkbox, radio, number] = getAllByTestId("element")
//         userEvent.tab()
//         expect(checkbox).toHaveFocus()
//         userEvent.tab()
//         expect(radio).toHaveFocus()
//         userEvent.tab()
//         expect(number).toHaveFocus()
//     })
//
//     it("select options", () => {
//         const {selectOptions, getByRole, getByText} = render(
//             <select>
//                 <option value="1">A</option>
//                 <option value="2">B</option>
//                 <option value="3">C</option>
//             </select>
//         )
//         userEvent.selectOptions(getByRole("combobox"), "1")
//         expect(getByText("A").selected).toBeTruthy()
//
//         userEvent.selectOptions(getByRole("combobox"), "2")
//         expect(getByText("B").selected).toBeTruthy()
//         expect(getByText("A").selected).toBeFalsy()
//     })
// })

jest.mock("axios")
const hits =
    [
        {
            objectID: 1,
            title: "Angular"
        },
        {
            objectID: 2,
            title: "React"
        },
    ]

describe("App", () => {
    it("fetch news from API", async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: {hits}}))
        const {getByRole, findAllRole} = render(<App/>)
        userEvent.click(getByRole("button"))
        const items = await findAllRole("listitem")
        expect(items).toHaveLength(2)

        //
        expect(axios.get).toHaveBeenCalledTimes(1)
        expect(axios.get).toHaveBeenCalledWith("http://hn.algolia.com/api/v1/search")
    })


    it("fetch news from API and reject", async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error()))
        const {getByRole, findByText} = render(<App/>)
        userEvent.click(getByRole("button"))
        const message = await findByText(/Something went wrong/i)
        expect(message).toBeInTheDocument()
    })

    it("fetch news from API New Test with ACT", async () => {
        const promise= Promise.resolve({data: {hits}})
        axios.get.mockImplementationOnce(() => promise)
        const {getByRole, getAllByRole} = render(<App/>)
        userEvent.click(getByRole("button"))
        await act(()=>promise)
        expect(getAllByRole("listitem")).toHaveLength(2)
    })
})
