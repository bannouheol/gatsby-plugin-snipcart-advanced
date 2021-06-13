const React = require("react");
const { useStore, SnipcartContext } = require("../store");

/**
 * @param props : {currency, version}
 */
const SnipcartProvider = (props) => {
  const [state, dispatch] = useStore();
  React.useEffect(() => {
    const listenSnipcart = () => {
      document.addEventListener("snipcart.ready", () => {
        dispatch({ type: "setReady", payload: true });
      });
    };

    if (window.Snipcart !== undefined) {
      dispatch({ type: "setReady", payload: true });
    } else {
      listenSnipcart();
    }
  }, [props, dispatch]);

  return (
    <SnipcartContext.Provider value={{ state }}>
      {props.children}
    </SnipcartContext.Provider>
  );
};

SnipcartProvider.defaultProps = {
  version: "3.2.0",
};

export default SnipcartProvider;
