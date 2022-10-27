import { useFlow } from "../../contexts/flowContext";
import "./SettingsPanel.scss";

const SettingsPanel = () => {
  const { selectedNode, setSelectedNode, setNodes } = useFlow();
  const changeHandler = (newValue, index) => {
    selectedNode.data.data[index].value = newValue;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id == selectedNode.id) {
          node.data = {
            ...node.data,
            data: [...selectedNode.data.data],
          };
        }
        return node;
      })
    );
  };

  const backHandler = () => setSelectedNode(null);

  return (
    <div className="settings-panel">
      <div className="settings-panel-nav">
        <i
          className="bi bi-arrow-left-short settings-panel-nav-bicon"
          onClick={backHandler}
        ></i>
        <p>{selectedNode.data.name}</p>
      </div>
      <div className="settings-panel-body">
        {selectedNode.data.data.map((property, index) => {
          switch (property.type) {
            case "text":
              return (
                <div className="settings-panel-body-element" key={`text${index}`}>
                  <label>Text</label>
                  <textarea
                    value={property.value}
                    onChange={(e) => {
                      changeHandler(e.target.value, index);
                    }}
                  ></textarea>
                </div>
              );
            case "image":
              return (
                <div
                  className="settings-panel-body-element"
                  key={`image${index}`}
                >
                  <label>Image URL</label>
                  <input
                    value={property.value}
                    onChange={(e) => {
                      changeHandler(e.target.value, index);
                    }}
                  ></input>
                </div>
              );
          }
        })}
      </div>
    </div>
  );
};

export default SettingsPanel;
