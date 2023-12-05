import { AvalancheFuji, Chain } from "@thirdweb-dev/chains";

export const TWApiKey: string = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID || '';
export const S_KEY: string = process.env.NEXT_PUBLIC_TEMPLATE_S_KEY || '';
export const OPENWEATHERMAP_KEY: string = process.env.NEXT_PUBLIC_TEMPLATE_OPENWEATHERMAP || '';
export const activeChain: Chain = AvalancheFuji;
export const EDITIONDROP_ADDRESS: string = '0x61f5A7B35606FF96177e06c0f3FeB66A7582453d';
export const AVACATNFT_ADDRESS: string = '0x1B41ad735064115970d42D875f51609Abb5f3325';
export const FUNCTION_GETWEATHER_ADDRESS: string = '0x12fCa18310615Fabc69ac52054C63e0c839C471f';
export const VRFRANDOM_ADDRESS: string = '0xEdD18873998B54D8F982759F42acd2cbcA73fCaB';
export const SOURCEMINTER_ADDRESS: string = '0x55f9dFf220C2Fb9935799948138185D79615f5bb';
export const DESTINATIONMINTER_ADDRESS: string = '0xCaE840cDb40eA19b6886ce0D1e6fF323BA0598fC';
export const DESTINATIONWALLET_ADDRESS: string = '0x5474C31B545A8101c980C388a1551A56AD46FB59';