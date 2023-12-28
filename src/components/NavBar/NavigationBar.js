import React, { useCallback, useMemo, useState } from 'react';
import './NavigationBar.css';
import {Navbar,NavItem,NavbarToggler,Collapse,Nav} from 'reactstrap'
import { Link } from 'react-router-dom';
export default function NavigationBar() {
    const routes = [
        {
            path: '/',
            component: 'Body',
        },
        {
            path: '/MostLikedPost',
            component: 'MostLikedPost',
        },
        {
            path: '/MostCommentedPost',
            component: 'MostCommentedPost',
        }
    ]
    let pathName = useMemo(
        () => window.location.pathname,
        [window.location.pathname],
    )
    const [isOpen,setIsOpen] = useState(false);
    const toggle = useCallback(()=>setIsOpen(!isOpen),[isOpen])
  return (
    <div className='navBar1'>
      <Navbar color='dark' dark className='fixed-top d-flex justify-between'>
        <NavItem>
            <Link to={'/'} className='text-white'>Home</Link>
        </NavItem>
        <NavbarToggler onClick={toggle} style={{width:'auto'}}/>
        <Collapse isOpen={isOpen} navbar style={{color:'white',width:'auto'}}>
            <Nav className='ml-auto' navbar>
                {routes.map((route)=>(
                    <NavItem key={route.path}>
                        <Link to={route.path} onClick={toggle}>
                            <p className={` ${pathName.split('/')[1] === route.component ? 'text-gray-400' : 'text-secondary'}`}>
                                {route.component}
                            </p>
                        </Link>
                    </NavItem>
                ))}
                {/* <NavItem>
                    <Link to={'/'} onClick={toggle}>
                        <p className={`m-2 ${!!!pathName.split('/')[1] ? 'text-white' : 'text-secondary '}`}>
                            {' '}
                            Authors
                        </p>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to={'/MostLikedPost'} onClick={toggle}>
                        <p className={`m-2 ${pathName.split('/')[1] === 'MostLikedPost' ? 'text-white' : 'text-secondary'}`}>
                            {' '}
                            Most Liked Post
                        </p>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to={'/MostCommentedPost'} onClick={toggle}>
                        <p className={`m-2 ${pathName.split('/')[1] === 'MostCommentedPost' ? 'text-white' : 'text-secondary'}`}>
                            {' '}
                            Most Commented Post
                        </p>
                    </Link>
                </NavItem> */}
            </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
