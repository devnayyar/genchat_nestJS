import streamlit as st
import requests

# Backend API URLs
BASE_URL = "http://localhost:3000"
LOGIN_URL = f"{BASE_URL}/auth/login"
SIGNUP_URL = f"{BASE_URL}/auth/signup"
GENCHAT_URL = f"{BASE_URL}/genchat/chat"

# Streamlit session state
if "authenticated" not in st.session_state:
    st.session_state.authenticated = False

# Helper function to make API requests
# Helper function to make API requests
def make_request(url, data=None, headers=None):
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        if response.text:
            return response.json()
        else:
            st.warning("Empty response received from server.")
            return None
    except requests.exceptions.RequestException as e:
        st.error(f"Error: {e}")
        return None

# Page: Home
def home_page():
    st.title("Welcome to Genchat")
    st.write("Please login or signup to access Genchat.")
    if st.button("Login"):
        st.session_state.page = "login"
    if st.button("Signup"):
        st.session_state.page = "signup"

# Page: Login
def login_page():
    st.title("Login")
    email = st.text_input("Email")
    password = st.text_input("Password", type="password")
    if st.button("Login"):
        login_data = {"email": email, "password": password}
        response = make_request(LOGIN_URL, data=login_data)
        if response and "accessToken" in response:
            st.session_state.authenticated = True
            st.session_state.access_token = response["accessToken"]
            st.session_state.refresh_token = response["refreshToken"]
            st.session_state.page = "genchat"

# Page: Signup
def signup_page():
    st.title("Signup")
    username = st.text_input("Username")
    email = st.text_input("Email")
    password = st.text_input("Password", type="password")
    if st.button("Signup"):
        signup_data = {"username": username, "email": email, "password": password}
        response = make_request(SIGNUP_URL, data=signup_data)
        if response and "accessToken" in response:
            st.session_state.authenticated = True
            st.session_state.access_token = response["accessToken"]
            st.session_state.refresh_token = response["refreshToken"]
            st.session_state.page = "genchat"

# Page: Genchat
# Page: Genchat
def genchat_page():
    st.title("Genchat")
    if not st.session_state.authenticated:
        st.warning("Please login or signup to access Genchat.")
        st.stop()

    chat_input = st.text_input("Enter your query")
    if st.button("Send"):
        data = {"text": chat_input}
        headers = None
        if st.session_state.authenticated:
            headers = {"Authorization": f"Bearer {st.session_state.access_token}"}
        
        response = make_request(GENCHAT_URL, data=data, headers=headers)
        if response:
            if isinstance(response, dict):
                st.write("Response:")
                st.write(response)
            else:
                st.error("Invalid response from server.")

# Main function
def main():
    if "page" not in st.session_state:
        st.session_state.page = "home"

    if st.session_state.page == "home":
        home_page()
    elif st.session_state.page == "login":
        login_page()
    elif st.session_state.page == "signup":
        signup_page()
    elif st.session_state.page == "genchat":
        genchat_page()

if __name__ == "__main__":
    main()
