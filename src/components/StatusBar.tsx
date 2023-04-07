import { useContext } from "react";
import { TableContext } from "../ctx/TableContext";

export function StatusBar() {
  const [ state ] = useContext(TableContext);
  const stage = state.stage;
  
  return (
    <div className="center-wrapper">
      <div className="status-bar-wrapper">
        <div className="status-bar">
          <div className="center-wrapper">
            <span>
              {stage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
