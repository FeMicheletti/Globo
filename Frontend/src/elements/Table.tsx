//* CSS
import "@/styles/table.css"

//* Interface
import { TableProps } from "@/interface/table.interface";

//* Icons
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function Table({ 
		columns, 
		data, 
		headerStyle = {}, 
		columnStyle = {}, 
		generalHeaderStyle = {}, 
		generalColumnStyle = {},
		toInsert = null,
		toFilter = null,
		rowFunction = null,
		style = {}
}: TableProps) {

	const [filter, setFilter] = useState<string>("");

	return (
		<div className="divTable">
			<div className="divTableHeader">
				{toInsert && (
					<FaPlus onClick={toInsert} size={35} className="iconCreate"/>
				)}
				{toFilter && (
					<div className="divFilter">
						<input type="text" placeholder="Filtro" onChange={(e) => setFilter(e.target.value)}/>
						<FaSearch onClick={() => toFilter(filter)} size={25} className="iconCreate"/>
					</div>
				)}
			</div>

			<table style={style}>
				<thead>
					<tr>
						{columns.map((column) => (
							<td 
								key={column.key}
								style={headerStyle[column.key] || generalHeaderStyle || {}}
							>
								{column.name}
							</td>
						))}
						{rowFunction && 
							<td key={"func"} style={{textAlign: "center", width: "150px"}}>Funções</td>
						}
					</tr>
				</thead>
				<tbody>
					{data.map((rowData:any) => (
						<tr key={rowData.id}>
							{columns.map((column) => (
								<td 
									key={column.key} 
									style={columnStyle[column.key] || generalColumnStyle || {}}
								>
									{rowData[column.key]}
								</td>
							))}
							{rowFunction && 
								<td key={"func"}>{rowFunction(rowData.id)}</td>
							}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
