export const CONFIG = {
    BLACK: "rgba(0,0,0,100)",
    WIDTH: {
        NONE: "0",
        NARROW: "2",
        NORMAL: "4",
        THICK: "10"
    },
    FILLCOLORS: {
        BLACK: "rgba(0,0,0,100)",
        WHITE: "rgba(255,255,255,100)",
        NONE: "none"
    },
    NOFILL: "none",
    DASHED: {
        NORMAL: "6 3",
        DOTTED: "5 5"
    },
    DIMENSION: 200.0,
    FILLPATTERNS: {
        STRIPE_VERTICAL: '<defs>    <pattern id="STRIPE_VERTICAL" patternUnits="userSpaceOnUse" width="6.5" height="6.5" patterntransform="rotate(0)">        <line x1="0" y="0" x2="0" y2="6.5" stroke="#000000" stroke-width="5" />    </pattern></defs>',
        STRIPE_LEFT: '<defs>    <pattern id="STRIPE_LEFT" patternUnits="userSpaceOnUse" width="6.5" height="6.5" patterntransform="rotate(-45)">        <line x1="0" y="0" x2="0" y2="6.5" stroke="#000000" stroke-width="5" />    </pattern></defs>',
        STRIPE_RIGHT: '<defs>    <pattern id="STRIPE_RIGHT" patternUnits="userSpaceOnUse" width="6.5" height="6.5" patterntransform="rotate(45)">        <line x1="0" y="0" x2="0" y2="6.5" stroke="#000000" stroke-width="5" />    </pattern></defs>',
        STRIPE_HORIZONTAL: '<defs>    <pattern id="STRIPE_HORIZONTAL" patternUnits="userSpaceOnUse" width="6.5" height="6.5" patterntransform="rotate(90)">        <line x1="0" y="0" x2="0" y2="6.5" stroke="#000000" stroke-width="5" />    </pattern></defs>',
        DOTTED: '<defs>   <pattern id="DOTTED" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse"> <circle id="pattern-circle" cx="5" cy="5" r="1.5" fill="#000000"></circle> </pattern></defs>',
    }
}
