import { css } from 'lit';

export class Typography {
    static typeTitle = css`
        font-family: 'Roboto Flex';
        font-variation-settings: "wdth" 120, "wght" 500;
        font-size: 33px;
    `;
    
    static typeSubtitle = css`
        font-family: 'Roboto Flex';
        font-variation-settings: "wdth" 120, "wght" 250;
        font-size: 23px;
    `;
    
    static typeDetail = css`
        font-family: 'Roboto Flex';
        font-variation-settings: "wdth" 115, "wght" 250;
        font-size: 16px;
    `;
    
    static typeDetailTitle = css`
        font-family: 'Roboto Flex';
        font-variation-settings: "wdth" 140, "wght" 800;
        font-size: 17px;
    `;
    
    static typeClick = css`
        font-family: 'Roboto Flex';
        font-variation-settings: "wdth" 110, "wght" 550;
        font-size: 15px;
    `;
}