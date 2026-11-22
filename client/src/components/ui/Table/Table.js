import "./table.css"

export default function Table({columns,data}){

return(

<table className="table">

<thead>
<tr>

{columns.map(c=>(
<th key={c.key}>{c.label}</th>
))}

</tr>
</thead>

<tbody>

{data.map(row=>(
<tr key={row._id}>

{columns.map(col=>(
<td key={col.key}>
{col.render ? col.render(row) : row[col.key]}
</td>
))}

</tr>
))}

</tbody>

</table>

)

}