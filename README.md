# alexbuaiscia

#TODO:
    
    - add 'alert' of logoff

#MOBILE TODO:

    - adj max-height on horizontal mode iphone/ipad + resize font
    - maxheight hidden img restyle for horizontal mode (smaller)

#feedback

1) the devlife page has 2 headers which is confusing 
2) There is a Log In/Sign up Button. But this doesn't make sense for a portfolio page
3) On the Dev Blog, you have Pages mentioned as 0. Probably hide this?

 Couple things I notice, one on the splash page. It moves the footer down when you animate them. I think this footer should remain in the same position when the animations occur.There are some mobile issues with this section as well. I think the titles are supposed to remain hidden on mobile. But they display, and upon animation the height just gets taller. Of course I guess this would not occur on a true mobile device because you wouldn’t hover… But in say a split screen view where somebody has shrunk their browser down to half the screen width this would happen.Also on mobile at 320px wide, the blog page has some image overflow.Additionally, there are some console errors. It looks like the site is having some CORS problems fetching your twitter embed. Which is a little wierd because the widget does display. Maybe thats like, live streaming doesn’t work, so user would just have to refresh everytime they want a new feed. Something like that, thats my first guess. I ran into CORS problems on something I was working on the other day. The fix was to make the request serverside, in your Node/express code. Then fetch it client side from your server 

I’m Trying to think about the best way to fix the footer thing. You could do something like this to keep it always at the bottom.
footer {
 position: absolute;
 bottom: 0;
 width: 100%;
}
But thats not really your problem.
Your problem is more that when you’r animation occurs, the height of your main content gets taller. My solution would probably end up being a little hacky lol. Something like put all the cards in a div with a fixed height. Making sure that they fit after the animation occurs. That way the footer position is based off the fixed height div instead of the total height of the above cards. Does that make sense? might not be the most elegant solution….


#VERSION

    2