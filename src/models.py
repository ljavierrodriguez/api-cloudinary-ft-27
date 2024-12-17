from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Gallery(db.Model):
    __tablename__ = "gallery"
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), default="")
    active = db.Column(db.Boolean(), default=True)
    public_id = db.Column(db.String(100), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "description": self.description,
            "public_id": self.public_id,
            "active": self.active
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()