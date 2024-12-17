from flask import Blueprint, request, jsonify
from models import Gallery
import cloudinary.uploader

api = Blueprint("api", __name__)

@api.route('/gallery', methods=['GET'])
def gallery():

    images = Gallery.query.filter_by(active=1).all()
    images = [img.serialize() for img in images]

    return jsonify(images), 200


@api.route('/gallery/upload', methods=['POST'])
def upload_image():

    description = ""
    active = True
    file = None

    print(request.form)

    if 'description' in request.form:
        description = request.form['description']

    if 'active' in request.form:
        active = True if request.form['active'] == 'true' else False

    if 'image' in request.files:
        file = request.files['image']
    else:
        return jsonify({"error": "image is required"}), 400
    
    resp = cloudinary.uploader.upload(file, folder="mygallery")

    if not resp:
        return jsonify({ "error": "error loading image"}), 400

    image = Gallery()
    image.description = description
    image.active = active
    image.filename = resp['secure_url']
    image.public_id = resp['public_id']
    image.save()

    return jsonify({"status": "success", "message": "image uploaded successfully", "data": image.serialize()}), 200
    

    #return jsonify({ "filename": file.filename, "description": description, "active": active, "resp": resp }), 200