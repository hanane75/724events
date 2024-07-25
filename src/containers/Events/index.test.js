import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scène principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scène principale"],
    },
  ],
};

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );
    await screen.findByText("avril");
  });

  describe("and an error occurred", () => {
    it("an error message is displayed", async () => {
      api.loadData = jest.fn().mockRejectedValue();
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      expect(await screen.findByText("An error occurred")).toBeInTheDocument();
    });
  });

  describe("and we select a category", () => {
    it.only("a filtered list is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      // Wait for initial render
      await screen.findByText("Forum #productCON");

      // Simulate category selection
      fireEvent.click(await screen.findByTestId("collapse-button-testid"));
      fireEvent.click((await screen.findAllByText("soirée entreprise"))[0]);

      // Wait for the filtered results to appear
      await screen.findByText("Conférence #productCON");

      // Assert the element is not in the document anymore
      await waitFor(() => {
        expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
      }, 2000); // timeout de 2 secondes
    });
  });

  describe("and we click on an event", () => {
    it("the event detail is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data);
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );

      fireEvent.click(await screen.findByText("Conférence #productCON"));

      await screen.findByText("24-25-26 Février");
      await screen.findByText("1 site web dédié");
    });
  });
});
