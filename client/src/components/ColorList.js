import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState({  newColor: {color: "",
  code: { hex: "" }}})

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>updateColors([...colors.filter(color=>color.id !== colorToEdit.id), res.data]))
  };

  const deleteColor = color => {
    // Make a put request to delete this color
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res=>{console.log(res)})
    getColors()
  };

  const submitColor = e => { 
    e.preventDefault()
    console.log(addColor)
    // axiosWithAuth().post('/api/colors', addColor).then(res=>{
    //   updateColors({addColor: res.data})
    //   setAddColor(initialColor)
    //})
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>

        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* <form onSubmit={submitColor}>
      <legend>add color:</legend>
          <label>
            color name:
            <input
              onChange={e=>
                setAddColor({
                  ...setAddColor, color: e.target.value
                })
              }
              value={addColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e=> setAddColor({...setAddColor, code: { hex: e.target.value}})}
              value={addColor.newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add color</button>

          </div>
      </form> */}
    </div>
  );
};

export default ColorList;
