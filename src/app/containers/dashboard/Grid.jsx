import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import api from '../../service/Proxy';

const styles = theme => ({
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        height: '10',

    },
    cardContent: {
        flexGrow: 1,
    }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

class DataGrid extends Component {

    render() {
        const { classes, data } = this.props;
        console.log('From Grid__', data);
        const up = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhUSEBIQEBAVFRUXEBUVEBUQEA8VFREWFhYXFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGRAQGi0mICUtLS4tLS0rLSstKystLTctKy0rLS0tNS0tKy0tLS0rLS0tLS0tLSstLS0tLS0tLS0uLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xABDEAACAgACBwQIBAMGBQUAAAABAgADBBEFBhIhMUFREzJhcSJCUmKBkaGxFCPB0QeCkiQzU3Ky8BU0Q6LhRGTC0vH/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEBQEG/8QAKxEAAgEDAwEHBQEBAAAAAAAAAAECAwQREiExEwUiMkFRobFCYXGB0fAj/9oADAMBAAIRAxEAPwD3GEIQAhCEAIQhACERmAGZIAHEncBMLGaxAnYwym5+bcK1+POAbpOXGZWL1hw1e4P2jdKxt/UbpkWYS27fibSw9hfRrH7yzRh0QZIoXyG/5wBbNN4l/wC6pFY62Hf/AEiV3bFv3sRsjoiAfXjLwpYwNSjvMB8YBmNgSe/de/nYZGdF1c9o+bEzSe+heNi/ORnH4X2xAKH/AAyrkGH8xijCbPctvTytYS8MZhT64j17Bu7YvzgFNLsSndxDHwdQ314y1VpzEL360sHVDsN8jHHBZ91gZBbhnXlANPDaw0McnJpbpYNkf1cJrKwIzBBB4EbwZxtgz3EZ+BkVG3Uc6Xavw4ofNTAO4hOfweseW7ELse+uZT4jis3q7AwBUhgeBBzB8jAHQhCAEIQgBCEIAQhCAEIQgBCEIASjpTStWHXNzmx7qDezeQ/WVtNaZFOVdY7S9u6vJfFv2mZg8AQ3aXHtLjxJ3hfBYAy1b8Uc7ya6vVqU5E/5pdooCjZRQB0EmCczuEydI6fSv0ahtN15CAaj7KDN2AEy8VrFWm6sbR68pw+sOtdVWfbWF35Vr6TfLgB5zh9Ia4Ym47NQFK8tn0nPxkJVFEi5JHqektZ2AzstSpfFgv3nLYzXfDD/AKllp91Tl82yE4NdG32nasJzPN2JaXatCoO8xby3CUus/JEHN+Rt269L6lLH/M4+wEgOu9nKmv8AqaVU0fUPUB898lGFrHqr8pW6s/Ui5yJl11s501/1NLVOuo9ak/yv+4lD8Mnsr8oxsFWfVA8t0j1przI65ep1GC11p9u2s+8pI+a5zqNG62FhudLV8CCZ5U+jV5Ej6iRfg7EOa8RzU5ET1XUlyj3rNcnutGlcPdub0G8ZJfgDxQhhPGMDrDfXuf8AMHRtzfOdnoDW0HIKxB5o/wCnWX07iE9s7lkakZHSOMtxEXB4qyg51HdzQ9xv2PlLmGxtOJGR9B5WxeEavjvHIy8sOl0Xpau8ZD0bB3kPEeI6jxmhPPjmCCCVYb1YbiJ02hNN9p+Xbktvqngtvl0PhANuEIQAhCEAIQhACEIQAmRp7S3YgV1javfuj2R7RlnTGkVw9Zc724IvNmPCYWjsKwJtt9K59590dBAH6PwXZ5sx27W3ux3nyHhLtjrWNpzkBB3WtS7nICcTrHp4ZM9jbFS8PH9zALWnNP7QPpCuocSTlu8TPL9P65M5NeFzVeBsPff/ACjkPr5TL05pu7GvsqCtWfoIOfi3U/aWtHaLWve2TP8ARfL95nnUzsipzzwZ2D0Q9npWEqDvOe92+c28PhUrGSqB48SfjJosqICQiwkGzzIQiwkGyOQyhFiyDZ5kTKLCLlINkckb1BuIlWzCEb13/cS/lFAlUiDJ9E6fesgWZsvJvXX956RoTT6WqFsIZTwb955ZbQDvG4/eP0fjXobdvX1l5Hy6GaKN44PTPdFtOu47S4PWNIYDY9Jd6H6TNb/8PMHwjtWtPq6hWO0h3DPip6GXNKYHsztLvQ8PCdVNNZRrTyber+me1/KtP5oHonlYP/sOYm5PNw5BBBIYHNSOIM7bQekxiEzOQsXdYPHkR4GenppQhCAEIQgBEZgBmdwHHwizA1qxZ2Vw9Z9O05N4Jz/30zgFBbTi7jc390m6kcifa/34TUQczwEgw1ARQi8BulDWTH9mvZr3jx8BAMjWTTAbP0tmpMyTy3c545rBpezG27K59kDlWvX3m8ftNTXnTJdvw9Z9Bd9pHrNyXyH38pT0NgdgbbD0zw90TPVnl4RVOWdibR2AWodXPeP6DwlyEXKUtkBIsIsg2eCRYQykGyOQhFgzAcSBINkWwyiyFsUg8Yz8YOQPzlbkiLZaiyqMWen1jhifD6ytzRHUWQIuUhXEDpJFtBkHJEWx+Ua9efnHiOAlbZFsTR+Kalsxw9Ydf/M9M1d0mt6dm5zBHoGeZumc0NB441OBnkCd3gZrsrrRLRLh+xdQraXpfB2WkMMamKnhyiaNxzUWCwcODj2l5zVfLFUbQ768ZzzTtm89NptDqGU5qQCD1Bj5zGp2kMwaGPD0q/LmPnv+M6eAEIQgCEzkMHZ291mIPAnZq8FE2taMV2eHbLvP6C9fS4/TOZ+Co2EVByG/z5wC0HCKXPACeaa4abNVb25+mx2ah7x4fIAn4Tt9Z8TsViscW4+U8T12x3a3isd2sZfzHj+gldSWmOSM3hGVonDG1yzbwN7E+sxnRSto7D9mgHPifMy1MeSgSLCLlItnmRIuUIMwAzO4SDZFsJFdiFXxPQSpfjCdy7h15mVwJVKZByJ7MWx4eiPDj85Fx4xQsY96qQu9nPdVQWdvJRvlXek8IjuyULHhZHc71jatpxNK+1ZRZWvzYSapgwzUgg8CJGcJw8SIyTXIoWPAigSQLKWyGRoWSBYoWPCyDZ5kRRJlY+cQLHgSDkRySKc4hWAWSASDkRbOw1N0nkQrHcdzfoZd07hezszHdbeJx2jLSjg9f9iegY38/DK43svGfR2Nfq0lnlbM6lvU1w+6MPBYo1WLYOKnPzHMfKel1WBlDDeCAR4gjMTysmd1qdi9ujYPGskfynev6j4TaXm7CEIBzOsb7eIpq5Lm7fp9pYw4zMz7X28Xc3JQqD4Df9ZoUHIM3QGAcjrbjwGscn0a1J+QznjmDU23ZtvJYs33nea94rKh+tjhfhntH6Ll8Zx+g697N4AD7n7CZLiXeSKKj3wasWEWZ2yGRIsIMwAzPCQbItjbLAozMy77i538OQi32lzny5DpGhZRKeStsQLHhYoWKc8wqKXscha0UZtYxOQAEgsyeER5H4XC232ph8Ou3fackHJRzduigbyZ71qbqjh9G1BUAe9h+dcR+ZYee/kvQSj/AA71NGjqjZbk2MtA7ZuPZjiK0Psj6mdhOxb0FSj9zbSp6V9xHUEEEAgjIgjMEHkRPGv4kal/gmOMwaf2Vv8AmalG6g/4ij2evTy4ezRttYYFWAZSCGBGYIPEGWzgpxcWTnFSWGfN9ZBAI3g8D1kgWbOu2qzaLu26wTgLW/LPH8NYeNbe6eR+HnlqJ87cUZUZYf6OZUg4PDGhZIFihY8LMrZU2IFjwsULHhZBsjkQLHhY4LHhZBs8yIoneapX9pW1Z5jP6Thws6TU67ZsA+HznS7Jq4quHqvg1Wc8Tx6kOJTZZh0Jm5qTidm5k5Ov1XfM/WCrZubx3yPQd2xiKm98D+rd+s+jOmemwhCAcZo9tprn9q1z/wBxmhe2zQ58DMvQp/LJ6sxmhpA/2Z/KAeQ6+Wbql8WJ+QA/WZWiFyTzJ/aaGvHfrHun/VKmjR+WPj95zqz/AOjMs33mWYsWEpbINhM7G3bRyHAfUy3i7dkbuJ4TOAlM5eRCTEAjwsULH7hvO4DjKWyGRljhQSeA+Z8B4z1f+GGpRoAxuLX+0uPyKzv/AAyEf6yOPThMf+GOpv4hlx2KX8lTnhK2H94RwucdPZHx6T1+da0t9C1S5+DXRpY7zCEITaaAhKOjNL4fEmwUWpaanKW7Jz2GHI/vL0AraSwFWJqem5Q9bghlPMH9Z4XpzQlujcR+HtzalszhLTwsX2GPJ14ePGe+zK1l0DTj6GouG470Yd6pxwZfESi4oRrQ0sqq01NYPEgseBC3CXYa5sLihlcndYdy9OViHnnzHKTKk+XqwlTk4y5OTJOLwxoWPAjwkkCShsgRhY8LJAkeEkGeEYWamgW2bV8x95RCS3o3dYvmPvNNhLFzD8llu8VYm/rYv5inqsxUfZIPQg/I5zf1s4p5TnjPsDtnqvbDrFnM/iz1hAKOh91eXRmmljRnhn8pn4IbLWr7Nrj/ALjNIDapceBgHjmuq+nWfdP+qVNG9weZ+81NdKv7s+LD7GZWjD6JHjOVcbVWY6njZbi5QyjMQ2Sn6ShyK2yhiX2m8BuEaFigR4WZ3IrbEAnTahaoHSVnaXDLA1t6X/unHqD3BzPPhMfQuiGx2JqwqsUFhJtYd5Kl3uV8eAHi0+g9H4KvD1pVSorqRQqKOCgToWVBP/pL9GihTz3mTooAAAAAGQA3AAchFhCdQ2BPN/4m64sh/AYNsr2H9otB/wCXrPqj3z9B57tb+IuuP4CsU0ZPjbRlUvEUrzscdByHM+E8mwuHK5lmL2MS1jnezseJJmK8ulRjhcszV62hYXJNoLGW6NtXEYXM5DZvrz3YivPM5+8N5Bnu2g9L04ylL6G2q3HxU81YciDuInhgWX9WdOvou82AFsJaR+KrG/YPDtUHUcxzExWN7v06j/DKLevh6ZHucJFhcSlqLZWwdHAZGBzDA8CJLO0dA5zXXVZNIU5AivE15th7Mu63st1U8DPK8KzZtXaprvrOzch4qw5jqDxBnu84P+J+hB2f4+oZXUAdrl/1qc/SDdSM8wZhvbRVoZXiXBmuKOtZXJx6pHhJJWAQCN4IzHkZKEny7OURBI4JJgkcEkGeMhCSxgU/MXzEAks6KrzuUeImiwWbmH5LLdZqxNXWw70HuznzNrWp87QOgmMq7RAHEnIfHdPsTtnW/hj0hOm/Dr0hAOUxSbGKuXkxDj4jf9c5e0cc816iR6zV7F9dnJ1KHzG8SLCWbLiAcDrthPQf3HB+BOz+s5PRxyJHUfaeo644EFm6WKR9J5YgKNv4g5H4bjOZfLE1IyXCxJM0wJWxp4D4y0JTxG9jME5bGdshAjwsULJAspbIZOm/ha6rpIA8Ww9mx8GQkfb5T2mfOlF9tFld9BAupYMmfdfkyN4MCR8Z7dqtrVhtIVhqmC2ZfmUsQLam5grz8xO1YVVKlp80bbaaccG7Of111pr0bQbGG3c3o4erPI2ueHko4kyfWXWbC6PrNmIsAIHoVgg22HkFXx68J4pjMbfjrzi8VuY7qa/Vw6cgPHqZdc3EaMMvnyJ1qqgiJO1tsfEYhu0xFhzduSjkqjko6SyFigSRFnzFWrKpJylycqUnJ5YipJlrz3HeI5Ek6JKzwvalawnRtgouJOAtb8tj/wCksJ4f5D9D8Z68DnvHCeLW4ZXUq4zUjIibupOtRwZGCxrnsuGEvY7gv+E7eHInlO/YXnUXTnz8nQtq+e7I9NmPrjYq4DFFuH4e4fE1kD6kTU7dNnb2l2Ms9raGzl1z4ZTzfXTWBdIN+DwrbeHVgcXaO4+ycxUh57xvM6FWpGnFykaZzUYtsxtFVkU1g8ezTP8ApEuhJIqSQJPj5PLbOKyIJHBJKEjgkrZFkISaGrdO1dnyUSqwyE19BL2dL2nnnlOj2RS1V3P0Xu9v6arKGamfQx9NXbdzHxy+UTQtO3fUvvg/Lf8ApKljZknqZv6lYfavL8kU/M7v3n051TuoQhAMfWrDbdBYd6shx/Lx+n2nP12ZgMOe+duygjI7wePjOENJpd6T6pzTxQ7xAL+l6e2o2h3lnlGn8JsW7Q4Pv+POes6MuGZQ8GnI63aI7ygc9qv9pmuqXUptLkqrQ1ROPwjZjLpIWGZPnFq9E/eOynAlLY5zY0LHhYoWSBZU2QyNCyK7AVuc2X0vaBKt8xLQWPCyKm4vMXg81NcFOjRlSna2dpuRYlyPLOXgsULHhZGdSUnmTyRcm+QVZMiQRZOiSvJ4KiSZEiosmRZ6ARI63DJYpV1DqeIIzElRZMiz1PHB6Y66tYb2Xy9ntH2PlnNfDYZK1Coqoo4ADICTKklVZZKpOfibZJyb5IwkeEkgSPCStoiRBYuzJtmGzK2RZWtQkhRxYzT09YKqUpXiRviaDoDM1zd1e7MfSuL7Wwty4Dyn0/Ztv0qOXy9/4dW1p6Ib8spzu9S8JsUbZ42En+Ubh+s4rB4Y2uta8WIHl1M9RoqCKqLuVQAPIDKdA0kkIQgBOd1swe5b1G9N1nih5/Azoo2xAwIIzBBBHIg8YBwqvwI8xNDHUDE05jvrM/GYQ4ew1Hu8aj1Xp5iSYHFGts+XOAcBpvAFG2gMgT6Xun/zM4LPTtYtFLYvaIM1I9MfrPPcXhDW2XL1T/vnOH2hbOD6keH7HPuaWl6lwVgseFihY8LOU2ZMiAR4WOCx4WVtkcjQJIqxQslRZBsjkVFlhFjUWWEWe5PRUWTosRFk6LJI9BFkyLBFkyLJI9BVkirHKslVZI9GBY8LJAsULDQI9mROhdhWnE8fASW+zZ4b2O5RzJlqsLhKzY++1ptsLPqz1y8K93/uS+3oa3l8Ih05iVprFFfHL0pzUkxFxdizcTJ9F4Fr7FrXn3j7K8zPpDqHR6k6O43sPdr/APkf0+c62R4ela1VFGSqAB8JJACEIQAhCEAz9N6NGIry4Ou+tuh/YzisyCVYbLqcmHQz0WYesOhu1HaVZC5eI5WDofHoYBi6Nx+x6Lb0P0lXWDQYYF6xtId5A5eIlYN5gjcQeIPQy/o7SZr9Ft6H6TxpNYZ41nZnB4jClDkeHIxgE9C0poRLl26cjnxWcbi9HNWSMj5cxPn7zs+VPvU917o5te2cd48FILHhYoWPCzjtmPIirJkWIqyZFkckcj0WTosaiydFnqZ6ORZMixqCToJNMkORZMixqCTKJNM9Q5VkqrGqJKok0ySFCyO+0L4se6o4mBuLHYqG23X1V8zJ9mvCjbsO3af97p0baxlV70to/JqpW7nu+AopWgG68jb9UdPATntJY5rm2jw5DpDSGPe5s24chyEqgTvRiopRitjoJJLCFRSSABmTuAHEmehauaIGGr9LI2tvc9OijwEo6raB7L860fmHuL/hjqfe+06WSPQhCEAIQhACEIQAhCEAwtPaCF35lWS2jiPVtHQ9D4zkHBBKsCrDiDuInpkzdL6GrxA3+jYO644jwPUQDi8JjnqOandzHIzW7XD4oZONh+syNI6Otw5ysG7kw3o3x5eUp7UAtaT1bdd6+kOo4/KYb4Zl4idDg9NW17s9pehmj+Nwt+6xdhuswXHZ1Gtu1h+qM9W2hPfhnFqsnRZ09urtb76rAfAyhbq/evAZ+RnHq9jVo+Bp+z/37MU7GovDuZyCToI44K5eKN8oBXHqN8pldhcx5g/n4KXb1V9JIgkyCRJt+w3yk9dVx4VN8ZKNjcv6GeqhVf0kiiSiOq0ZiW47KD5mTf8AC6U33WlvDPITZS7KrS8WF7/H9L4WdR87Fb8QM8lBdug/eWqtHWPvuYVp7IO8+ZkdumqahlSgJ6zGxukrbe827oNwnVodn0qW73f3/hrp20Ib8mzitMVUjYw6jPrOevvZzmxJMjlvR2jrb22a1z6ngq+Zm40FZFJIABJPADeTO01c1cFWVtwBs9VeVfiep+0vaF0DXhhn37ebEcPBRyE14AQhCAEIQgBCEIAQhCAEIQgBCEIAy2pXBVgGU8QRmDOa0nqmDm2HbZ9xt6/A8ROohAPL8bg7KTlYhU8s+B8jKpM9YsrVhkwDA8QRmD8DMTG6q4d96A1H3Tmv9J/TKAcLXe691iPjL1OnL19bPz3zRxWqF6/3bJYP6TMu/Q2JTvVP8BtfaAXk1ls5qpkg1lP+GswHQr3gV8wR943OAdAdZjyrWRWayXHgFHwmJnFRS3dBPkM4Bdv0ve/FyPLdKb2E8ST5mXKNEYh+7VZ8V2fvNPC6pXt3ylY89o/IQDnpNhcJZadmtWc+A4eZ5TtcFqnh032bVp8Tsr8h+83aaVQbKKqqOAAAH0gHK6L1Q4NiG/kU8fNv2nU4ehK1CooVRwAGQkkIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCARX8DOZxfEwhAEw/Eec6XDd0QhAJ4QhACEIQAhCEAIQhACEIQAhCEAIQhAP/Z";
        const down = "data:image/png;base64,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";
        return (
            <Grid container spacing={40}>
                {data.map(card => (
                    <Grid item key={card.app} sm={6} md={4} lg={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                image={card.status == 'up' ? up : down}
                                className={classes.cardMedia}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {card.appName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        );
    }
}

DataGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataGrid);