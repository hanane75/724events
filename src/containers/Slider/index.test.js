import { render, screen, waitFor } from "@testing-library/react";
import Slider from "./index";
import { DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

// Mock le contexte DataProvider
jest.mock("../../contexts/DataContext", () => ({
  DataProvider: ({ children }) => <div>{children}</div>,
  useData: () => ({ data, error: null }),
}));

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Déboguer le DOM rendu
    screen.debug();

    // Assurez-vous que le composant affiche correctement "World economic forum"
    await waitFor(() => {
      expect(screen.getByText(/World economic forum/i)).toBeInTheDocument();
    });

    // Assurez-vous que le composant affiche correctement "janvier"
    await waitFor(() => {
      expect(screen.getByText(/janvier/i)).toBeInTheDocument();
    });
  });
});
