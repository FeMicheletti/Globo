export interface Column {
	key: string,
	name: string
}

export interface TableProps {
	columns: Column[];
	data: Array<object>;
	headerStyle?: any;
	columnStyle?: any;
	generalHeaderStyle?: object;
	generalColumnStyle?: object;
	toInsert?: null | (() => void);
	toFilter?: null | ((filter:string) => void);
	rowFunction?:  null | ((id:number) => any);
	style?: object
}