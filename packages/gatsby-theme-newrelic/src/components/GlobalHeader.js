import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { graphql, useStaticQuery, navigate, Link } from 'gatsby';
import DarkModeToggle from './DarkModeToggle';
import ExternalLink from './ExternalLink';
import Button from './Button';
import NewRelicLogo from './NewRelicLogo';
import Icon from './Icon';
import SwiftypeSearch from './SwiftypeSearch';
import Overlay from './Overlay';
import GlobalNavLink from './GlobalNavLink';
import useMedia from 'use-media';
import { useLocation } from '@reach/router';
import useQueryParams from '../hooks/useQueryParams';
import useKeyPress from '../hooks/useKeyPress';

const action = css`
  color: var(--secondary-text-color);
  transition: all 0.2s ease-out;

  &:hover {
    color: var(--secondary-text-hover-color);
  }
`;

const actionLink = css`
  ${action};

  display: flex;
  align-items: center;
`;

const actionIcon = css`
  cursor: pointer;
`;

const GlobalHeader = ({ className, search, utmSource }) => {
  const location = useLocation();
  const { queryParams } = useQueryParams();

  const { site } = useStaticQuery(graphql`
    query GlobalHeaderQuery {
      site {
        layout {
          contentPadding
          maxWidth
        }
      }
    }
  `);

  useKeyPress('/', (e) => {
    // Don't trigger overlay when typing in an input or textarea
    if (e.target.matches('input') || e.target.matches('textarea')) {
      return;
    }

    e.preventDefault();

    if (!queryParams.has('q')) {
      navigate('?q=');
    }
  });

  const hideLogoText = useMedia({ maxWidth: '600px' });
  const hideMenuLinks = useMedia({ maxWidth: '650px' });

  const { layout } = site;

  return (
    <div
      data-swiftype-index={false}
      className={className}
      css={css`
        background-color: var(--color-neutrals-100);
        overflow: hidden;
        position: sticky;
        top: 0;
        z-index: 80;

        .dark-mode & {
          background-color: var(--color-dark-100);
        }
      `}
    >
      <div
        css={css`
          height: 30px;
          display: flex;
          justify-content: space-between;
          max-width: ${layout.maxWidth};
          margin: 0 auto;
          padding: 0 ${layout.contentPadding};
        `}
      >
        {search && (
          <Overlay
            isOpen={queryParams.has('q')}
            onCloseOverlay={() => navigate(location.pathname)}
          >
            <SwiftypeSearch
              css={css`
                display: flex;
                flex-direction: column;
                max-width: 950px;
                margin: 3rem auto;
                height: calc(100vh - 6rem);
              `}
            />
          </Overlay>
        )}
        <nav
          css={css`
            display: flex;
            align-items: center;
            height: 100%;
          `}
        >
          <ExternalLink
            href="https://newrelic.com/"
            css={css`
              display: flex;
              align-items: center;
              margin-right: 1rem;
            `}
          >
            <NewRelicLogo omitText={hideLogoText} />
          </ExternalLink>

          {!hideMenuLinks && (
            <ul
              css={css`
                height: 100%;
                margin: 0;
                padding: 0;
                display: flex;
                list-style-type: none;
                white-space: nowrap;
              `}
            >
              <li>
                <GlobalNavLink href="https://developer.newrelic.com/">
                  Developers
                </GlobalNavLink>
              </li>
              <li>
                <GlobalNavLink href="https://opensource.newrelic.com/">
                  Open Source
                </GlobalNavLink>
              </li>
              <li>
                <GlobalNavLink href="https://docs.newrelic.com/">
                  Documentation
                </GlobalNavLink>
              </li>
              <li>
                <GlobalNavLink href="https://discuss.newrelic.com/">
                  Community
                </GlobalNavLink>
              </li>
            </ul>
          )}
        </nav>

        <ul
          css={css`
            margin: 0;
            padding: 0;
            display: flex;
            list-style-type: none;
            align-items: center;

            > li {
              transition: all 0.2s ease-out;
              margin-left: 1rem;
              color: var(--secondary-text-color);
            }
          `}
        >
          {search && (
            <li>
              <Link to="?q=" css={actionLink}>
                <Icon
                  css={actionIcon}
                  name={Icon.TYPE.SEARCH}
                  size="0.875rem"
                />
              </Link>
            </li>
          )}
          <li>
            <DarkModeToggle css={[actionIcon, action]} size="0.875rem" />
          </li>
          <li>
            <Button
              as={ExternalLink}
              href="https://newrelic.com/signup"
              size={Button.SIZE.EXTRA_SMALL}
              variant={Button.VARIANT.PRIMARY}
              css={css`
                display: flex;
                align-items: center;

                .dark-mode & {
                  color: white;
                  border-color: var(--color-brand-800);
                  background-color: var(--color-brand-800);
                }
              `}
            >
              <Icon
                css={css`
                  ${actionIcon}
                  margin-right: 0.25rem;
                `}
                name={Icon.TYPE.CLOUD}
              />
              <span>Sign up</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

GlobalHeader.propTypes = {
  className: PropTypes.string,
  search: PropTypes.bool,
};

export default GlobalHeader;
