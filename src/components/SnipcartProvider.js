const React = require("react");
const { useStore, SnipcartContext } = require("../store");

/**
 * @param props : {currency, version}
 */
const SnipcartProvider = (props) => {
  const [state, dispatch] = useStore();
  const { locales } = props;
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
  }, [props, dispatch, locales]);

  return (
    <SnipcartContext.Provider value={{ state }}>
      {props.children}
    </SnipcartContext.Provider>
  );
};

SnipcartProvider.defaultProps = {
  version: "3.2.0",
  locales: {},
};

export default SnipcartProvider;
