// 'use strict'
const nodemailer = require('nodemailer')

interface Article {
  title: string;
  link: string;
  tagName: string;
  uploader: string;
}

interface Week {
  title: number;
  week: number;
  createdTime: string;
  articles: Article[];
  emails: []
}

async function main(weekItem: Week) {
  // 测试
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'margarett12@ethereal.email',
      pass: '5Ef8n12QKBSzX3K7FU',
    },
  })
  // let transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   secure: true,
  //   auth: {
  //     user: process.env.EMAIL_AUTH_USER,
  //     pass: process.env.EMAIL_AUTH_PASS,
  //   },
  // })

  const {emails} = weekItem
  const postHtml = genEmailHtml(weekItem)
  emails.map(email => {
    const message = {
      from: process.env.EMAIL_AUTH_USER,
      to: email,
      subject: `每周精选丨Fe Weekly 前端小报第 ${weekItem.week}期 `,
      html: postHtml,
    }
    transporter.sendMail(message, (err:any, info:any) => {
      if (err) {
        console.log('Error occurred. ' + err.message)
        return process.exit(1)
      }
      console.log('Message sent: %s', info.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })
  })
}

function genEmailHtml (weekItem: Week) {
  const {week, articles, createdTime} = weekItem
  const articleHtml = getArticleHtml(articles)
  return `
  <div id="mailContentContainer" class="qmbox qm_con_body_content">
    <style>
    .qmbox .body{
      color: #5E5E5E;
    }
    .qmbox * {
      font-family: '微软雅黑';
    }
    .qmbox a{
      cursor: pointer;
      outline: none;
      text-decoration: none;
    }
    .qmbox ul{
      padding-inline-start: 20px;
    }
    .qmbox li{
      list-style-type: none;
      margin-bottom: 20px;
    }
    .qmbox table tr th{
      font-weight: 100;
    }
    .qmbox table tr th li p {
      font-size: 18px;
    }
    .qmbox .article-title{
      color: #303133;
      font-weight: bold;
      text-decoration: none;
      font-size: 18px;

    }
    .qmbox .article-title:hover{
      color: #1890ff
    }
    </style>

    <table width="944px" style="margin: 0 auto">
      <tbody>
      <tr style="width: 100%;height: 100px;">
        <td style="width: 994px;height: 100px;margin: 0 auto;padding-top: 10px;">
          <h2 style="margin: 0;padding: 0;text-align: center;color: #3A3A3A;font-size: 30px;">
            <span style="width: 20px;height: 20px;background: #1890ff;display: inline-block;position: relative;left: 10px;top: 5px;">
            </span>
            <i style="width: 20px;height: 20px;z-index: 2;background: #FFB900;display: inline-block;position: relative;left: -30px;top: 10px;">
            </i>
            <strong style="position: relative;">Gt Fe 前端小报第 ${week} 期</strong>
            <b style="width: 20px;height: 20px;background: #1890ff;display: inline-block;position: relative;left: 40px;top: 5px;">
            </b>
            <em style="width: 20px;height: 20px;background: #FFB900;display: inline-block;position: relative;left: 0px;top: 10px;">
            </em>
          </h2>
          <p style="margin: 0;padding: 0;text-align: center;color: #969696;	font-size: 14px;">
            ${createdTime}
          </p>
        </td>
      </tr>
          <tr style="min-height: 234px;width: 100%;margin-bottom: 20px;">
        <td style="min-height: 182px;width: 852px;margin: 0 auto;padding: 26px 46px;border: 1px #ECECEC solid;position: relative;">
          <span style="width: 6px;height: 28px; display: table-cell;background: #1890ff;"></span>
          <h3 style="color: #303133; display: table-cell;margin: 0;padding: 0;font-size: 22px;line-height: 28px; padding-left: 10px;">
            本周推荐文章
          </h3>
          <ul>${articleHtml}</ul>
        </td>
      </tr>
      <tr height="16px;">
        <td></td>
      </tr>
      </tbody>
      <tfoot style="width: 100%;height: 126px;background-color: #F4F4F4; ">
        <tr>
          <td>
            <p style="color: #A4A4A4;padding: 0; text-align: center;height: 96px;line-height: 96px;">
              copyright© Lego Weekly
              <span style="border-bottom:1px dashed #ccc;z-index:1" onclick="return false;" data="2020-2020">2020-2020</span>
              All Right Reserved</p>
          </td>
        </tr>
      </tfoot>
    </table>
    <style type="text/css">.qmbox style, .qmbox script, .qmbox head, .qmbox link, .qmbox meta {display: none !important;}</style>
  </div>`
}

function getArticleHtml(list: Article[]):string {
  return list.reduce((prev: string, cur: Article) => {
    const {link, title, tagName, uploader} = cur
    let item = `<li><a href="${link}" class="article-title" rel="noopener" target="_blank">
    <strong>${title}</strong></a>
    <br>
    <p style="margin: 0;color: #666; font-size: 14px;">
      <span style="color: #1890ff;">${uploader}&nbsp;</span>
      <span>${tagName}&nbsp;</span>
    </p></li>`
    return prev + item
  }, '')
}

function postMessage(weekItem: Week){
  return main(weekItem).catch(console.error)
}

module.exports = postMessage
