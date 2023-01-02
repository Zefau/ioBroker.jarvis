var t=`
body {
	scrollbar-width: none;
	-ms-overflow-style: none;
	overflow-y: scroll;
}

body::-webkit-scrollbar {
	width: 0px;
	background: transparent;
}`,a=`
@media (max-width: $breakpoint-md-min) {
	.container.desktop {
		padding: 0;
		/*grid-template-columns: none !important;*/
		grid-template-rows: none !important;
	}
	
	.container.desktop .widget-scaler {
		transform: none !important;
	}
}

/*
 * TWO COLUMNS
 */
@media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-md-min) {
	.container.desktop > .box:nth-child(odd) {
		grid-area: auto / auto / auto / auto !important;
		grid-column: 1 / span 6 !important;
	}
	
	.container.desktop > .box:nth-child(even) {
		grid-area: auto / auto / auto / auto !important;
		grid-column: 7 / span 6 !important;
	}
}

/*
 * ONE COLUMN
 */
@media (min-width: 0) and (max-width: $breakpoint-sm-min) {
	.container.desktop > .box {
		grid-area: auto / auto / auto / auto !important;
		grid-column: 1 / span 12 !important;
	}
}
`;export{t as S,a};
