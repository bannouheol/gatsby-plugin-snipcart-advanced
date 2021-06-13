"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = require("react");

var _require = require("../store"),
  useStore = _require.useStore,
  SnipcartContext = _require.SnipcartContext;
/**
 * @param props : {currency, version}
 */

var SnipcartProvider = function SnipcartProvider(props) {
  var _useStore = useStore(),
    state = _useStore[0],
    dispatch = _useStore[1];

  React.useEffect(
    function () {
      var listenSnipcart = function listenSnipcart() {
        document.addEventListener("snipcart.ready", function () {
          dispatch({
            type: "setReady",
            payload: true,
          });
        });
      };

      if (window.Snipcart !== undefined) {
        dispatch({
          type: "setReady",
          payload: true,
        });
      } else {
        listenSnipcart();
      }
    },
    [props, dispatch]
  );
  return /*#__PURE__*/ React.createElement(
    SnipcartContext.Provider,
    {
      value: {
        state: state,
      },
    },
    props.children
  );
};

SnipcartProvider.defaultProps = {
  version: "3.2.0",
};
var _default = SnipcartProvider;
exports.default = _default;
