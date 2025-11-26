const { maxBy, groupBy, mapValues, entries, sumBy } = require("lodash");
const { info } = require("./logger");

const dummy = (blogs) => {
        return 1;
}

const totalLikes = (blogs) => {
        return blogs.reduce((previous, current) => {
                return previous + current.likes;
        }, 0)
}

const favBlog = (blogs) => {

        let favBlog = undefined;
        blogs.forEach(blog => {
                if (!favBlog || blog.likes >= favBlog.likes) {
                        favBlog = blog;
                }
        });
        return favBlog;
}

const mostBlogs = (blogs) => {
        const grouped = groupBy(blogs, "author");
        const measuredGroups = mapValues(grouped, blgs => blgs.length);
        return maxBy(Object.entries(measuredGroups), entry => entry[1]);
}

const mostLikes = (blogs) => {
        const grouped = groupBy(blogs, "author");
        const measuredGroups = mapValues(grouped, blgs => sumBy(blgs, "likes"));
        const mostLiked = maxBy(Object.entries(measuredGroups), entery => entery[1]);
        return { author: mostLiked[0], likes: mostLiked[1] };
}




module.exports = { dummy, totalLikes, favBlog, mostBlogs, mostLikes };
