// store/mailSlice.ts
import { Mail } from "@/components/rpr-mail/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MailState {
  selectedMail: Mail | null;
}

const initialState: MailState = {
  selectedMail: null,
};

export const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setSelectedMail: (state, action: PayloadAction<Mail | null>) => {
      state.selectedMail = action.payload;
    },
  },
});

export const { setSelectedMail } = mailSlice.actions;
export default mailSlice.reducer;
