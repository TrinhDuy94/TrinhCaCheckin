from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
import time
import os

path = os.path.dirname(os.path.abspath(__file__))

localtime = time.asctime( time.localtime(time.time()) )

app = Flask(__name__)

with open(path+"/CheckIn.json") as f:
	jdata = f.read()
	infos = json.loads(jdata)

@app.route("/dangki")
def dangki():
   return render_template("dangki.html",time = localtime, amount = countcheckin())

@app.route('/api/dangki', methods =["POST"])
def dangkiHandler():
	if request.method == "POST":
		data = request.get_json()
		
		info = {}
		info["ID"] = len(infos)+1
		info["Ten"] = data.get("Ten")
		info["Gioitinh"] = data.get("Gioitinh")
		info["Email"] = data.get("Email")
		info["Sodienthoai"] = data.get("Sodienthoai")
		info["Checkin"] = data.get("Checkin")
		infos.append(info)
		js = json.dumps(infos,ensure_ascii=False)
		print(js)
		if data != None:
			with open(path+'/Checkin.json', 'w') as j:
				j.write(js)
			return jsonify({"messege":"successful"})
		else:
			return jsonify({"messege":"failed"})

@app.route("/checkin")
def checkin():
   return render_template("checkin.html",time = localtime, amount = countcheckin())

@app.route("/api/getinfos", methods = ["GET"])
def get_infos():
	return jsonify({"infos":infos})

@app.route("/api/getinfos/<string:ten>", methods = ["GET"])
def get_info(ten):
	info = [info for info in infos if info['Ten'].lower() == ten.lower()]
	return jsonify({"info":info})

@app.route("/api/checkin/<int:id>", methods = ["GET"])
def checkinact(id):
	for i in infos:
		if i["ID"]==id:
			i["Checkin"]="X"

	for i in infos:
		if i["ID"]==id: 
			if i["Checkin"]=="X":
				with open(path+'/CheckIn.json', 'w') as jf:
					json.dump(infos,jf,ensure_ascii=False)
				return jsonify({"messege":"successful"})
			else:
				return jsonify({"messege":"failed"})

def countcheckin():
	count = 0
	for i in infos:
		if i["Checkin"]=="X":
			count += 1
	return count

if __name__ == '__main__':
	app.run(debug=True, port=8080)