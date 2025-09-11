//Users
export const Save_User = (data) => ({
  type: "Save_User",
  payload: data,
});

export const Update_User = (data) => ({
  type: "Update_User",
  payload: data,
});

export const Remove_User = () => ({
  type: "Remove_User",
});

//Games
export const Save_Games_Data = (data) => ({
  type: "Save_Games_Data",
  payload: data,
});

export const Save_Dashboard_Info = (data)=>({
  type: "Save_Dashboard_Info",
  payload: data
})
