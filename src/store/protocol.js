import { createSlice } from "@reduxjs/toolkit";
import optimism from '../assets/optimism-logo.svg'
import ethereum from '../assets/eth-logo.svg'
import arbitrum from '../assets/arbitrum-logo.png'

const protocols = [{id: 0, title: "ethereum", logo: ethereum}, 
{id: 1, title: "optimism", logo: optimism}, 
{id: 2, title: "arbitrum", logo: arbitrum}];

export const protocolSlice = createSlice({
  name: "protocol",
  initialState: {value: protocols[0]},
  reducers: {
    setProtocol: (state, action) => {
      if (protocols.map(d => d.id).includes(action.payload.id)) {
        state.value = protocols[action.payload.id];
      }
    }
  }
});

export const selectAllProtocols = state => protocols;
export const selectProtocol = state => state.protocol.value;
export const selectProtocolId = state => state.protocol.value.id;
export const selectProtocolName = state => state.protocol.value.title;
export const selectProtocolLogo = state => state.protocol.value.logo;


export const { setProtocol } = protocolSlice.actions;
export default protocolSlice.reducer;