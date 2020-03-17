import json
import hashlib
import os
import jwt
import datetime
from flask import Flask
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__, static_url_path='/static')
CORS(app)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'dell5559'
app.config['MYSQL_DB'] = 'twitter'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)


def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()


def generate_salt():
    salt = os.urandom(16)
    return salt.hex()

#Signup
@app.route('/signup',methods=["POST"])
def create():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]
    flag = False
    password_salt = generate_salt()
    password_hash = md5_hash(password + password_salt)
    cursor = mysql.connection.cursor()
    cursor.execute("""SELECT * FROM users""")
    results = cursor.fetchall()
    for item in results:
        if str(email) == str(item["email"]):
            flag = True
            mysql.connection.commit()
            cursor.close()
    if flag == True:
        return json.dumps("User Already Exist")
    else:
        cursor.execute("""INSERT INTO users (name, email, password_salt, password_hash) VALUES (%s, %s, %s, %s) """, [name, email, password_salt, password_hash])
        mysql.connection.commit()
        cursor.close()
        return json.dumps("Created Successfully")


#Login
@app.route('/login',methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]
    flag = False
    cursor = mysql.connection.cursor()
    cursor.execute("""SELECT * FROM users""")
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    for item in results:
        if str(email) == str(item["email"]) and str(item["password_hash"]) == str(md5_hash(password+item["password_salt"])):
            flag = True
            encoded_jwt = jwt.encode({"user_id":item["user_id"],"name":item["name"],"email":item["email"]}, 'twittersecretkey', algorithm='HS256').decode("utf-8")
    if flag == True:
        return json.dumps(str(encoded_jwt))
    else:
        return json.dumps("Wrong Password")

# Get Users from token
@app.route('/get-user')
def getUserByToken():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decode_data = jwt.decode(token_encoded, 'twittersecretkey', algorithms=['HS256'])
    return json.dumps(decode_data)

#Add Profile
@app.route('/add_profile',methods=["POST"])
def editProfile():
    user_id = request.headers.get("user_id")
    date_of_birth = request.headers.get("date_of_birth")
    gender = request.headers.get("gender")
    martial_status = request.headers.get("martial_status")
    if request.method == 'POST':
        f = request.files['image']
        location = "static/img/" + f.filename
        f.save(location)
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO profile (user_id, date_of_birth, gender, martial_status, image) VALUES (%s, %s, %s, %s, %s) """, [user_id, date_of_birth, gender, martial_status, location])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")

# Add Organisation
@app.route('/add_organisation',methods=["POST"])
def addOrganisation():
    user_id = request.json["user_id"]
    organisation_name = request.json["organisation_name"]
    joined_at = request.json["joined_at"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO organisation (user_id, organisation_name, joined_at) VALUES (%s, %s, %s) """, [user_id, organisation_name, joined_at])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")

# Show profile
@app.route('/show_profile')
def showProfile():
    user_id = request.headers.get("user_id")
    cursor = mysql.connection.cursor()
    cursor.execute("""SELECT * FROM profile where user_id = (%s)""",[user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(results)

# Show Organisation
@app.route('/show_organisation')
def showOrganisation():
    user_id = request.headers.get("user_id")
    cursor = mysql.connection.cursor()
    cursor.execute("""SELECT * FROM organisation where user_id = (%s)""",[user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(results)


# Show AllUsers
@app.route('/show_all_users')
def showAllUser():
    user_id = request.headers.get("user_id")
    # user_id = request.json["user_id"]
    cursor = mysql.connection.cursor()
    cursor.execute("""SELECT * FROM users as a join organisation as b on a.user_id = b.user_id where a.user_id != (%s)""",[user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    data = []
    for user in results:
        user["createdAt"] = datetime.datetime.strftime(user["createdAt"], "%d %b, %Y")
        data.append(user)
    return json.dumps(data)

# Show User by User ID
@app.route('/show_users')
def showUser():
    user_id = request.headers.get("user_id")
    cursor = mysql.connection.cursor()
    # cursor.execute("""SELECT * FROM users as a join profile as b on a.user_id = b.user_id join organisation d on a.user_id = d.user_id where a.user_id = (%s)""",[user_id])
    cursor.execute("""SELECT * FROM users as a join profile as b on a.user_id = b.user_id where a.user_id = (%s)""",[user_id])
    cursor.execute("""SELECT * FROM users """)
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    data = []
    for user in results:
        user["createdAt"] = datetime.datetime.strftime(user["createdAt"], "%d %b, %Y")
        data.append(user)
    return json.dumps(data)

# Send Connection or follow
@app.route('/send_connection',methods=["POST"])
def sendConnection():
    sender_user_id = request.json["sender_user_id"]
    reciever_user_id = request.json["reciever_user_id"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO connection(sender_user_id, reciever_user_id) VALUES (%s, %s) """, [sender_user_id, reciever_user_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Send Successfully")

# Follow Back
@app.route('/followback_connection',methods=["POST"])
def recieveConnection():
    sender_user_id = request.json["sender_user_id"]   # login User
    reciever_user_id = request.json["reciever_user_id"] # sender User
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO connection(sender_user_id, reciever_user_id) VALUES (%s, %s) """, [reciever_user_id,sender_user_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Send Successfully")

# Cancel Connection from Sender End
@app.route('/cancel_connectionSender',methods=["POST"])
def cancelConnectionS():
    user_id = request.json["user_id"]
    connection_id = request.json["connection_id"]
    print(user_id,connection_id)
    cursor = mysql.connection.cursor()
    cursor.execute("""DELETE from connection where connection_id = (%s) AND sender_user_id = (%s)""",[connection_id,user_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Cancelled Connection")

# Check Follower Exist
@app.route('/check_follower')
def checkConnection():
    sender_user_id = request.headers.get("sender_user_id")
    reciever_user_id = request.headers.get("reciever_user_id")
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from connection where sender_user_id = (%s) AND reciever_user_id = (%s)""",[sender_user_id,reciever_user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(results)

# Check Following exist
@app.route('/check_following')
def checkConnection2():
    sender_user_id = request.headers.get("sender_user_id")
    reciever_user_id = request.headers.get("reciever_user_id")
    cursor = mysql.connection.cursor()
    cursor.execute("""select * from connection where sender_user_id = (%s) AND reciever_user_id = (%s)""",[sender_user_id,reciever_user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(results)

# All Follower Users
@app.route('/check_connection_follower')
def checkConnectionConnected():
    user_id = request.headers.get("user_id")
    cursor = mysql.connection.cursor()
    cursor.execute("""select name,reciever_user_id,sender_user_id from users as a join connection as b on a.user_id = b.sender_user_id where reciever_user_id = (%s) """,[user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(results)

# All Following User
@app.route('/check_connection_following')
def checkConnectionNConnected():
    user_id = request.headers.get("user_id")
    cursor = mysql.connection.cursor()
    cursor.execute("""select name,sender_user_id,reciever_user_id,connection_id from users as a join connection as b on a.user_id = b.reciever_user_id where sender_user_id = (%s)""",[user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(results)

# Total Number of Followers
@app.route('/total_followers')
def totalFollowers():
    user_id = request.headers.get("user_id")
    cursor = mysql.connection.cursor()
    cursor.execute("""select count(name) as total from users as a join connection as b on a.user_id = b.sender_user_id where reciever_user_id = (%s) """,[user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(results)

# Total number of following
@app.route('/total_following')
def totalFollowing():
    user_id = request.headers.get("user_id")
    cursor = mysql.connection.cursor()
    cursor.execute("""select count(name) as total from users as a join connection as b on a.user_id = b.sender_user_id  where sender_user_id = (%s) """,[user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(results)

#Search User By Name
@app.route('/search-by-name/<name>')
def searchByName(name):  
    print(name)
    user_id = request.headers.get("user_id")
    cursor = mysql.connection.cursor()
    search_string= f"%{name}%"
    cursor.execute(""" select name,user_id from users where name like (%s) and user_id != (%s)""",[search_string,user_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

#Add Tweet
@app.route('/add-tweets',methods=["POST"])
def addTweets():
    user_id = int(request.headers.get('user_id'))
    tweet_title = request.headers.get('tweet_title')
    tweet_content = request.headers.get('tweet_content')
    if request.method == 'POST':
        f = request.files['postImageLink']
        location = "static/img/" + f.filename
        f.save(location)
    cursor = mysql.connection.cursor()  
    cursor.execute("""INSERT INTO tweets (user_id,tweet_title,tweet_content,postImageLink) VALUES (%s,%s,%s,%s) """,[user_id,tweet_title,tweet_content,location])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added")

#Show Tweets(Home)
@app.route('/show-tweets')
def showTweets():
    page = request.args.get("page", default = 1, type = int)
    return json.dumps(paginationHome(page))

# Show User Tweets(My Tweet)
@app.route('/my-tweets')
def myTweets():
    page = request.args.get("page", default = 1, type = int)
    return json.dumps(paginationUser(page))

#Pagination of Home 
def paginationHome(page):
    user_id = request.headers.get('user_id')
    cursor = mysql.connection.cursor() 
    cursor.execute("""SELECT  * from tweets as a join users as b on a.user_id = b.user_id join connection as c on c.reciever_user_id = b.user_id where c.sender_user_id = (%s) order by postedAt desc""",[user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    items = []
    for tweets in results:
        tweets["createdAt"] = datetime.datetime.strftime(tweets["createdAt"], "%d %b, %Y")
        tweets["postedAt"] = datetime.datetime.strftime(tweets["postedAt"], "%d %b, %Y")
        items.append(tweets)
    total_pages = len(items)//20 + 1
    total_tweets = len(items)
    return {
        "total_pages": total_pages,
        "total_tweets": total_tweets,
        "page": page,
        "data": items[(page*20)-20: page*20],
        "per_page": 20
        }

## Pagination of User(My Tweet)
def paginationUser(page):
    user_id = request.headers.get('user_id')
    cursor = mysql.connection.cursor()  
    cursor.execute("""SELECT  * from tweets as a join users as b on a.user_id = b.user_id  where b.user_id = (%s) order by postedAt desc""",[user_id])
    results = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    items = []
    for tweets in results:
        tweets["createdAt"] = datetime.datetime.strftime(tweets["createdAt"], "%d %b, %Y")
        tweets["postedAt"] = datetime.datetime.strftime(tweets["postedAt"], "%d %b, %Y")
        items.append(tweets)
    total_pages = len(items)//20 + 1
    total_tweets = len(items)
    return {
        "total_pages": total_pages,
        "total_tweets": total_tweets,
        "page": page,
        "data": items[(page*20)-20: page*20],
        "per_page": 20
        }

# Show Tweets by tweet Id
@app.route('/show_one_tweet/<int:tweet_id>')
def showOneTweets(tweet_id):
    print(tweet_id)
    cursor = mysql.connection.cursor()
    cursor.execute("""select tweet_id,name,tweet_content,tweet_title,postImageLink,postedAt from users s inner join tweets m on s.user_id = m.user_id and m.tweet_id =(%s)""",[tweet_id])
    results = cursor.fetchall()
    cursor.close()
    items = []
    for tweet in results:
        tweet["postedAt"] = datetime.datetime.strftime(tweet["postedAt"], "%d %b, %Y")
        items.append(tweet)
    return json.dumps(items)   

#Reply to Tweets
@app.route('/add-reply',methods=["POST"])
def replyTweets():
    user_id = int(request.json["user_id"])
    tweet_id = int(request.json["tweet_id"])
    replytweet = request.json["replytweet"]
    cursor = mysql.connection.cursor()  
    cursor.execute("""INSERT INTO replies (user_id,tweet_id,replytweet) VALUES (%s,%s,%s) """,[user_id,tweet_id,replytweet])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added")

if __name__ == "__main__":
    app.run(debug = True)