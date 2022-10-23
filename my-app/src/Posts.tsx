
import {useState} from 'react';
import posts from './mockPosts.json'
// import "bootstrap/dist/css/bootstrap.min.css"

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Posts() {
const [userList, setUserlist] = useState(posts.questions);

  return (
    <Box sx={{ minWidth: 275 }}>
        {userList?.length>0 && userList?.map(post=>{
                    return(
                        <Card variant="outlined">
                                <React.Fragment>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {post.username}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {post.ans}
                                            {/* <br />
                                            {'"a benevolent smile"'} */}
                                        </Typography>
                                    </CardContent>
                                </React.Fragment>
                        </Card>
                    )
                })}
        
    </Box>
  );
}
