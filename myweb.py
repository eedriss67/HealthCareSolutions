from flask import Flask, Blueprint, render_template, request, redirect, url_for, flash, session, logging, abort
from flask_login import LoginManager, login_user, logout_user, current_user, login_required, UserMixin
from forms import RegistrationForm, ContactForm, LoginForm
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin, AdminIndexView
from datetime import datetime
from flask_admin.menu import MenuLink





# Initializing Flask app
app = Flask(__name__)



# Flask Form Secret Key Configuration
app.config['SECRET_KEY'] = 'secret_key' 



# set optional bootswatch theme
app.config['FLASK_ADMIN_SWATCH'] = 'flatly'


# DataBase configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///something.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
with app.app_context():
    db = SQLAlchemy(app)




# Login Manager Configuration
login_manager = LoginManager(app)




# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'admin@gmail.com'
app.config['MAIL_PASSWORD'] = 'admin'
app.config['MAIL_DEFAULT_SENDER'] = 'admin@gmail.com'

mail = Mail(app)








# User Model class
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    username = db.Column(db.String(35), unique=True, nullable=False)
    email = db.Column(db.String(55), unique=True, nullable=False)
    password = db.Column(db.String(55), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    agency_id = db.Column(db.Integer, db.ForeignKey('agency.id'))
    jobs = db.relationship('Job', backref='user', lazy=True)

    def check_password(self, hash_password):
        return check_password_hash(self.password, hash_password)

    def is_active(self):
        return True   

    def __repr__(self):
        return '<User %r>' % self.username



    


# Agency Model Class
class Agency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    address = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    users = db.relationship('User', backref='agency', lazy=True)
    
    def __repr__(self):
        return '<Agency %r>' % self.name




# Job Model Class
class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    agency_id = db.Column(db.Integer, db.ForeignKey('agency.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Job %r>' % self.title





# Custom class for the Admin View
class AdminView(AdminIndexView):
    def is_accessible(self):
        if current_user.is_authenticated:
            return redirect(url_for('admin'))

        else:
            return redirect(url_for('login'))



# Custom class for the Model view
class UsersView(ModelView):
    can_export = True






# Admin Setup
admin = Admin(app, name='A&A CARE AND CLEANING SERVICES LTD', index_view=AdminView())
admin.add_view(UsersView(User, db.session))
admin.add_view(ModelView(Agency, db.session))
admin.add_view(ModelView(Job, db.session))

# add logout link to menu bar in the flask Admin
admin.add_link(MenuLink(name='Logout', url='/logout'))






# Login Manager User Loader Function
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))





# Custom Admin Route
@app.route('/admin')
def admin():
    return render_template('admin/index.html')




# Home Page Route
@app.route('/')
def home():
    user=current_user
    return render_template('home.html', user=user)
    



# Home Page Route & About Us Page Route
@app.route('/')
@app.route('/about') 
def about():
    return render_template('home.html')




# Route for the contact page
@app.route('/contact/', methods=['GET', 'POST'])
def contact():
    form = ContactForm(request.form)

    if request.method == 'POST' and form.validate():
        # Get the form data
        name = form.name.data
        email = form.email.data
        subject = form.subject.data
        message = form.message.data

        # Send the email
        msg = Message(subject, recipients=['admin@gmail.com'])
        msg.body = f"Name: {name}\nEmail: {email}\n\n{message}"
        mail.send(msg)

        return render_template('contact.html', success=True)
        
    return render_template('contact.html', form=form)      
    






# Register Page Route
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data, password=generate_password_hash(form.password.data))
        db.session.add(user)
        db.session.commit()
        flash('Account created successfully!', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)








# Login Page Route
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and user.check_password(form.password.data):
            login_user(user)
            flash('Login successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid email or password', 'danger')
            return redirect(url_for('login'))
        
    return render_template('login.html', form=form)






# Dashboard Page Route
@app.route('/dashboard/')
def dashboard():
    user = current_user
    return render_template('dashboard.html', user=user)






# Update Page Route
@app.route('/update', methods=['POST', 'GET'])
def update():
    if request.method == 'POST':
        user = current_user
        user.username = request.form['username']
        user.email = request.form['email']
        user.password = generate_password_hash(request.form['password'])
        db.session.commit()
        flash('Account updated successfully', category='success')
    return redirect(url_for('dashboard'))






# Logout Page Route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have logged out!', 'success')
    return redirect(url_for('home'))





# Setting for running the Flask app
if __name__ == '__main__':
    app.run(debug=True)
