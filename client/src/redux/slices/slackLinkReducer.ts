import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = "";

const slackLinkSlice = createSlice({
    name: "slackLink",
    initialState,
    reducers: {
        updateLink: (state, action) => {
            return action.payload
        },
    }
});

const SliceLinkReducer = slackLinkSlice.reducer;
export default SliceLinkReducer;
export const { updateLink } = slackLinkSlice.actions

