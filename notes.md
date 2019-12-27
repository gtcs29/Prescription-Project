ListView is deprecated and will be removed in a future release.
Add error saying - haven't verified email - after going from sign in to email verification
EmailVerification screen - update errors with toasts
make components
add passwordResetCheck where you check the entered password against the resetPassword sent and lead to a change password screen directly.
    If they dont go there, then next time when they login, check password entered against password reset - if its same - tell them to change.






Previous Changes:
    * Change Picture so that it doesn't have too much gap in between itself and the next component.
    * Find a way to render the email confirmation screen directly. Currently, it waits for the email to send, then renders that screen.
    * Change the input type of the input tag on email verification screen to numeric.
    * Verify email should not return to the signup screen.
    * Display error text in all forms.
    * Change respective text inputs on errors.
    * Add please check spam in email verification screen.
    * Print out errors from firebase based on error codes.
    * Display a spinner wherever async functions called, to show that we are processing.
    * Remove keyboard on completing last entry on the forms.
    * Add a Verify email option on login screen.
    * Add a please change your password screen post first login after resetting password.
    * If we dont enter the necessary info, it wont submit
    ---
    Additions:
    * Make a resend verification screen, if for example the user signs up but doesn't verify, then when he/she logins in again, it should tell them to verify using this screen.
    * Splash screen.
    * Change reference in SignIn screen password reset - to passwordReset screen. 
    Keep the same screen for password reset, inputs should be Old password, new password and verify new password. 
    (put a note that old password would be the temporary password in case of password reset.) 
    Also put in all the check conditions for password check from SignUp there too.
    ---
    Others:
    * Read Advanced native base Section 9 - might be helpful esp welcome screen.
    ---
    Future:
    * Do we wanna keep sign in using Username or Email?
    * https://itnext.io/react-native-tab-bar-is-customizable-c3c37dcf711f
    * https://medium.com/@victorvarghese/super-cool-material-ui-components-in-react-native-dd7c4434bc26
    * https://blog.pusher.com/animation-react-native-part-2/
    * https://code.tutsplus.com/tutorials/practical-animations-in-react-native--cms-27567
