import React from 'react'
import { Box, Container, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

export default function NotFound() {
    return (
        <div>
            <Helmet>
                <title> 404 | ShowcaseAPP </title>
            </Helmet>

            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Box align="center">
                        <img
                            alt="Under development"
                            src="/static/images/undraw_page_not_found_su7k.svg"
                            style={{
                                marginTop: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560
                            }}
                        />
                    </Box>

                    <Typography align="center" color="textPrimary" variant="h4">
                        Page introuvable
                    </Typography>

                    <Typography align="center" color="textPrimary" variant="subtitle2">
                        La page que vous cherchez est introuvable. Veuillez revenir en arririère.
                    </Typography>
                </Container>
            </Box>
        </div>
    )
}