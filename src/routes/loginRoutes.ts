import { Router, Response, Request, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: {
    [key:string]: string | undefined
  }
}

function requireAuth(req:RequestWithBody,res:Response, next: NextFunction):void {
  if (req.session?.loggedIn) {
    next();
  } else {
    res.status(403).send('Not permitted')
  }
}

const router = Router()



router.post('/login', (req:RequestWithBody,res:Response) => {
  const {email, password} = req.body;
  const validCredentials = email === 'hi@hi.com' && password === 'password'
  if (email && password && validCredentials) {
    req.session = {loggedIn: true}
    res.redirect('/')
  } else {  
    res.send('Invalid email or password')
  }
})

router.get('/', (req:Request, res:Response) => {
  if(req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `)
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Login</a>
      </div>
    `)
  }
})

router.get('/logout', (req:Request, res:Response) => {
  req.session = undefined
  res.redirect('/')
})

router.get('/protected', requireAuth, (req:Request, res, Response) => {
  res.send("Welcom to protected route")
})

export {router}