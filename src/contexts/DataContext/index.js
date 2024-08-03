import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null); // Ajoutez l'état pour 'last'

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);
      // Mettez à jour 'last' avec la dernière prestation (ou événement)
      if (loadedData.events && loadedData.events.length > 0) {
        setLast(loadedData.events[loadedData.events.length - 1]); // Définir la dernière prestation
      }
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) return;
    getData();
  }, [data, getData]); // Ajoutez 'getData' à la liste des dépendances

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, // Incluez 'last' dans le contexte
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
