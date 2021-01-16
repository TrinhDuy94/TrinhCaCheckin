function get_info()
{
	var ten = document.getElementById("ten").value;
	fetch("/api/getinfos/"+ten)
	.then(response => {
		if(!response.ok)
		{
			throw Error("ERROR");
		}
		return response.json();
	})
	.then(data => {	
		console.log(data.info);
		if (data.info.length==0)
		{	
			alert("Không tìm thấy!")
		}
		else
		{
			var html = `<table class="center">
	            <tr>
	              <th>ID</th>
	              <th>Tên</th>
	              <th>Giới tính</th>
	              <th>Email</th>
	              <th>Số thứ tự</th>
	              <th>Checkin</th>
	            </tr>`;
			for(var i = 0; i < data.info.length; i++)
			{
				var row =`<tr>
					  	<td>${data.info[i].ID}</td>
					    <td>${data.info[i].Ten}</td>
					    <td>${data.info[i].Gioitinh}</td>
					    <td>${data.info[i].Email}</td>
					    <td>${data.info[i].Sodienthoai}</td>`;
				if (data.info[i].Checkin == "X") 
				{
					row += `<td><p>CHECKED</p></td></tr>`;
				}
				else
				{
					row += `<td><input type="submit" id="checkin" class="btnch" onclick="checkin(${data.info[i].ID})" value="Checkin"/><p id="checked" hidden>CHECKED</p></td></tr>`;
				}
				html += row;

			}
			html = html + `</table>`;
			document.getElementById("info").innerHTML=html;
			html.innerHTML="";
		}
	})
	.catch(error=>{
		console.log(error);
	});
	document.getElementById("ten").value = "";
}
function checkin(id)
{	
	document.getElementById("checked").style.display = "block";
	document.getElementById("checkin").type = "hidden";
	fetch("/api/checkin/"+id)
	.then(response => {
		if(!response.ok)
		{
			throw Error("ERROR");
		}
		return response.json();
	})
	.then(data => {	
		console.log(data.messege);
		alert(data.messege);
		location.reload();
	})
	.catch(error=>{
		console.log(error);
	});
}

function dangki(){
	var ten = document.getElementById('tendk').value;
	var gt = document.getElementById('gt').value;
	var email = document.getElementById('eml').value;
	var sdt = document.getElementById('sdt').value;
	var checkin = null;
	if (document.getElementById('checkin').checked === true)
	{
		checkin = document.getElementById('checkin').value;
	} 
	var obj = {"Ten" : ten,"Gioitinh" : gt,"Email" : email ,"Sodienthoai" : sdt,"Checkin" : checkin};
	console.log(obj)
	//document.getElementById('test').innerHTML = JSON.stringify(obj);
	
	fetch("/api/dangki", {
	  	method: "POST",
	    headers: {
	        'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(obj)
	})
	.then(response => {
		if(!response.ok)
		{
			throw Error("ERROR");
		}
		return response.json();
	})
	.then(data => {
		console.log(data.messege);
		alert(data.messege);
		location.reload();
	})
	.catch(error=>{
		console.log(error);
	});
	document.getElementById('tendk').value = '';
	document.getElementById('gt').value = '';
	document.getElementById('eml').value = '';
	document.getElementById('sdt').value = '';
	if (document.getElementById('checkin').checked === true)
	{
		document.getElementById('checkin').checked = false;
	}
}
